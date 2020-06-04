const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');
const formidable = require('formidable-serverless');
const fs = require('fs');

router.post(routes.CREATE_POST, (request, response) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
 // form.maxFileSize = 3 * 1024 * 1024;
  form.parse(request, (error, fields, files) => {
    if(error) {
     response.status(400).json({
        error: "problem with the image"
      });
    } else {
      const post = new Post(fields);
      if (files) {
      //  console.log(files);
        if (files.image) {
          if (files.image.size > 10 * 1024 * 1024) {
            console.log(files.image.size);

            response.status(400).json({
              error: "File exceeds 3 mb"
            });
          } else {
            post.attachment.data = fs.readFileSync(files.image.path);
            post.attachment.contentType = files.image.contentType;
            const currentUser = JSON.parse(fs.readFileSync(files.user.path).toString());
            delete currentUser.friendRequests;
            delete currentUser.friendRequestsPending;
            delete currentUser.token;
            delete currentUser.message;
            //const buf = Buffer.from(JSON.stringify(currentUser));
            post.user = currentUser;
           // post.user.contentType = files.user.contentType;
          }
        }

        post.save().then(
          posts => response.status(200).json(posts)
        )
          .catch(
            error => {
              console.log(error);
            }
          );
      }
    }
  });
});

router.get(routes.GET_ALL_POSTS, async (_request, response) => {
  let posts = await Post.find().select().sort({_id: -1});
  response.status(200).json(posts);
});


module.exports = router;
