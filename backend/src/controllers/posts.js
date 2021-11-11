const router = require("express").Router();
const routes = require("../shared/constants/routes.constants");
const Post = require("../model/post");
const formidable = require("formidable-serverless");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const GCP_CONSTANTS = require("../shared/constants/gcp.constants");
const MESSAGES = require("../shared/constants/messages.constant");

const googleCloud = new Storage({
  keyFilename: path.join(__dirname, "../../bemeanstack-fc78c23520d4.json"),
  projectId: "bemeanstack",
});
const buckets = googleCloud.getBuckets();
const imagesBucket = googleCloud.bucket(GCP_CONSTANTS.IMG_BUCKET_NAME);
router.post(routes.POST.CREATE_POST, createPost);
router.post(routes.POST.READ_ALL_POST, readAllPosts);
router.post(routes.POST.UPDATE_POST, updatePost);
router.post(routes.POST.DELETE_POST, deletePost);

function createPost(request, response) {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, async (error, fields, files) => {
    if (error) {
      response.status(400).json({
        error: MESSAGES.ERROR.PROBLEM_WITH_IMAGE,
      });
    } else {
      const post = new Post(fields);
      const currentDate = Date.now();

      if (files && Object.keys(files).length) {
        if (files.image) {
          if (files.image.size > 5 * 1024 * 1024) {
            response.status(400).json({
              error: FILE_SIZE_EXCEEDED,
            });
          } else {
            const localReadStream = fs.createReadStream(files.image.path);
            const remoteWriteStream = imagesBucket
              .file("posts/" + currentDate + files.image.name)
              .createWriteStream({
                resumable: false,
                gzip: true,
              });

            localReadStream
              .pipe(remoteWriteStream)
              .on("error", (err) => {})
              .on("finish", async () => {
                console.log("uploaded");
                post.imageUrl = `${
                  GCP_CONSTANTS.BASE_URL + imagesbucketName
                }/posts/${currentDate}${files.image.name}`;
                const saveResponse = await post.save();
                const currentPost = await saveResponse
                  .populate("user", "displayName photoUrl admin")
                  .execPopulate();
                response.status(200).json(currentPost);
              });
          }
        }
      } else {
        const saveResponse = await post.save();
        const currentPost = await saveResponse
          .populate("user", "displayName photoUrl  admin")
          .execPopulate();
        response.status(200).json(currentPost);
      }
    }
  });
}

/**
 * to get all the post of user and users friends
 * @param {*} request
 * @param {*} response
 */
async function readAllPosts(request, response) {
  const ids = request.body
    ? request.body.friends.map((friend) => friend._id)
    : [];
  ids.push(request.body._id);
  let posts = await Post.find()
    .select()
    .where("user")
    .in(ids)
    .sort({ _id: -1 })
    .populate("user", "displayName photoUrl admin")
    .exec();
  response.status(200).json(posts);
}

async function updatePost(request, response) {}

async function deletePost(request, response) {
  const post = await Post.findOne({ _id: request.body.postId });
  if (post.user.equals(request.body.userId)) {
    if (post.imageUrl) {
      const file = imagesBucket.file(
        post.imageUrl
          .split("/")
          .slice(4, post.imageUrl.length + 1)
          .join("/")
      );
      file.delete((err, apiResponse) => {});
    }
    const posts = await Post.deleteOne({ _id: request.body.postId })
      .sort({ _id: -1 })
      .exec();
    response.status(200).json({
      message: MESSAGES.SUCCESS.SUCCESS_DELETED,
    });
  } else {
    response.status(400).json({
      error: MESSAGES.ERROR.NO_PERMISSION,
    });
  }
}
module.exports = router;
