const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');
const { filesUpload } = require('../middleware/files-upload');

router.post(routes.CREATE_POST,filesUpload, (request, response) => {
  console.log(request.body, '1');
  // const currentUser = JSON.parse(Buffer.from(JSON.stringify(request.files[0].buffer)).toString());
  // console.log(currentUser);

  // delete currentUser.friendRequests;
  // delete currentUser.friendRequestsPending;
  // delete currentUser.token;
  // delete currentUser.message;
  const post = new Post({
    text: request.body.text,
  //  user: currentUser,
    attachment: request.protocol + '://'+ request.get('host') + '/' + request.files[0].filepath
  });
  post.save().then(
    posts => response.status(200).json(posts)
  )
    .catch(
      error => {
        console.log(error);

      }
    );
});

router.get(routes.GET_ALL_POSTS, async (_request, response) => {
  let posts = await Post.find({});
  response.status(200).json(posts);
});


module.exports = router;
