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

  const post = new Post(request.body);
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
