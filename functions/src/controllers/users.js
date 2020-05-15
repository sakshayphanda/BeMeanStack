const router = require('express').Router();
const routes = require('../constants/routes.constants');
const User = require('../model/user');


router.get(routes.GET_ALL_USERS, (request, response, next) => {
  User.find({}).then(
    users=> {
      const usernames = users.map(user => user.firstName + ' ' + user.lastName);
      response.status(200).json(users);
    }
  );
})

router.post(routes.FRIEND_REQUEST, (request, response, next) => {
  User.findOne({
    _id: request.body.from
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      if (!updateUser.friendRequestsPending.includes(request.body.to)) {
        updateUser.friendRequestsPending.push(request.body.to)
      }
      User.updateOne({
        _id: request.body.from
      }, {$set: updateUser}).then(
        u => {
          response.status(200).json(updateUser);
        }
      );

    }
  );

  User.findOne({
    _id: request.body.to
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      if(!updateUser.friendRequests.includes(request.body.from)) {
        updateUser.friendRequests.push(request.body.from);
      }
      User.updateOne({
        _id: request.body.to
      }, {$set: updateUser}).then(
        u => {
        }
      );
    }
  );
});


module.exports = router;
