const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');
const formidable = require('formidable-serverless');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');


const gc = new Storage({
  keyFilename: path.join(__dirname, '../../bemeanstack-fc78c23520d4.json'),
  projectId: 'bemeanstack'
});

gc.getBuckets().then(
  buckets => {
    // console.log(buckets);

  }
);
const imagesbucketName = 'images-bemeanstack';
const imagesBucket = gc.bucket(imagesbucketName);


router.post(routes.CREATE_POST, (request, response) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (error, fields, files) => {
    if (error) {
      response.status(400).json({
        error: "problem with the image"
      });
    } else {
      const post = new Post(fields);
      if (files) {
        if (files.image) {
          if (files.image.size > 10 * 1024 * 1024) {
            response.status(400).json({
              error: "File exceeds 3 mb"
            });
          } else {
            const localReadStream = fs.createReadStream(files.image.path);
            const remoteWriteStream = imagesBucket.file('posts/'+files.image.name).createWriteStream(
              {
                resumable: false,
                gzip: true
              }
            );

            localReadStream.pipe(remoteWriteStream)
              .on('error', function (err) { })
              .on('finish', function (abc) {
                console.log('uploaded');
                post.imageUrl = `https://storage.googleapis.com/${imagesbucketName}/posts/${files.image.name}`;
                post.save().then(
                  async (post) => {
                   const currentPost = await
                    post
                    .populate('user', 'displayName photoUrl')
                    .execPopulate();
                    response.status(200).json(currentPost);
                    }
                )
                  .catch(
                    error => {
                      console.log(error);
                    }
                  );
              });
          }
        }

      }
    }
  });
});

router.post(routes.GET_ALL_POSTS, async (request, response) => {
  const ids = request.body ?  request.body.friends.map(friend => friend._id) : [];
  console.log(ids);
  ids.push(request.body._id);

  let posts = await Post.find()
  .select()
  .where('user')
  .in(ids)
  .sort({ _id: -1 })
  .populate('user', 'displayName photoUrl')
  .exec();
  response.status(200).json(posts);
});


module.exports = router;
