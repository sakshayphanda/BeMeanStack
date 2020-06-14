const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');
const formidable = require('formidable-serverless');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const googleCloud = new Storage({
  keyFilename: path.join(__dirname, '../../bemeanstack-fc78c23520d4.json'),
  projectId: 'bemeanstack'
});
const buckets = googleCloud.getBuckets();
const imagesbucketName = 'images-bemeanstack';
const imagesBucket = googleCloud.bucket(imagesbucketName);
router.post(routes.CREATE_POST, createPost);
router.post(routes.READ_ALL_POST, readAllPosts);
router.post(routes.UPDATE_POST, updatePost);
router.post(routes.DELETE_POST, deletePost);

function createPost(request, response){
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, async (error, fields, files) => {
    if (error) {
      response.status(400).json({
        error: "problem with the image"
      });
    } else {
      const post = new Post(fields);
      const currentDate = Date.now();
      const date = new Date();
      const hours =  date.getHours(), minutes = date.getMinutes();
      const _time = (hours > 12) ? (hours-12 + ':' + minutes +' PM') : (hours + ':' + minutes +' AM');
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      const currentDateAndTime = `${date.getDate()} ${monthNames[date.getMonth()]} at ${_time}`
      post.date = currentDateAndTime;
      if (files && Object.keys(files).length) {
        if (files.image) {
          if (files.image.size > 5 * 1024 * 1024) {
            response.status(400).json({
              error: "File exceeds 5 mb"
            });
          } else {

            const localReadStream = fs.createReadStream(files.image.path);
            const remoteWriteStream = imagesBucket.file('posts/' + currentDate + files.image.name ).createWriteStream(
              {
                resumable: false,
                gzip: true
              }
            );

            localReadStream.pipe(remoteWriteStream)
              .on('error', (err) => { })
              .on('finish', async () => {
                console.log('uploaded');
                post.imageUrl = `https://storage.googleapis.com/${imagesbucketName}/posts/${currentDate}${files.image.name}`;
                const saveResponse = await post.save();
                const currentPost = await saveResponse
                  .populate('user', 'displayName photoUrl admin')
                  .execPopulate();
                response.status(200).json(currentPost);
              });
          }
        }

      } else {
        const saveResponse = await post.save();
        const currentPost = await saveResponse
          .populate('user', 'displayName photoUrl  admin')
          .execPopulate();
        response.status(200).json(currentPost);
      }
    }
  });
}

async function readAllPosts(request, response) {
  const ids = request.body ? request.body.friends.map(friend => friend._id) : [];
  ids.push(request.body._id);
  let posts = await Post.find()
    .select()
    .where('user').in(ids)
    .sort({ _id: -1 })
    .populate('user', 'displayName photoUrl admin')
    .exec();
  response.status(200).json(posts);
}

async function updatePost(request, response) {}
async function deletePost(request, response) {
  const post = await Post.findOne({_id: request.body.postId});
  if(post.user.equals(request.body.userId)) {
    if(post.imageUrl) {
      const file = imagesBucket.file(post.imageUrl.split('/').slice(4, post.imageUrl.length + 1).join("/"));
      file.delete((err, apiResponse) => {});
    }
    const posts = await Post.deleteOne({_id: request.body.postId})
    .sort({ _id: -1 })
    .exec();
    response.status(200).json({
      message: 'Successfully deleted'
    });
  } else {
    response.status(400).json({
      error: 'You dont have permission delete Post'
    });
  }
}
module.exports = router;
