const router = require('express').Router();
const routes = require('../constants/routes.constants');
const User = require('../model/user');

router.get(routes.GET_ALL_POSTS, async (_request, response) => {
  let users = await User.find({});
  users = users.map(
    user=> {
      const currentUser = JSON.parse(JSON.stringify(user));
      delete currentUser.friendRequests;
      delete currentUser.friendRequestsPending;
      return currentUser;
    }
  );
  response.status(200).json(users);
});

module.exports = router;
