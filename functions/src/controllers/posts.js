const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');

router.get(routes.GET_ALL_POSTS, async (_request, response) => {
  let posts = await Post.find({});
  console.log(posts);

  response.status(200).json(posts);
});

router.post(routes.CREATE_POST, async (request, response) => {
  console.log(request.body);
  const currentUser = JSON.parse(JSON.stringify(request.body.user));
  delete currentUser.friendRequests;
  delete currentUser.friendRequestsPending;
  delete currentUser.token;
  delete currentUser.message;
  const post = new Post({
    text: request.body.text,
    user: currentUser
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

module.exports = router;
