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
    _id: request.body.from._id
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      const notUnique = updateUser.friendRequestsPending.some(req => req._id === request.body.to._id);
      if (!notUnique) {
        updateUser.friendRequestsPending.push(request.body.to);
        User.updateOne({
          _id: request.body.from._id
        }, {$set: updateUser}).then(
          u => {
            response.status(200).json(updateUser);
          }
        );
      } else {
        response.status(200).json(user);
      }
    }
  );

  User.findOne({
    _id: request.body.to
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      const notUnique = updateUser.friendRequests.some(req => req._id === request.body.from._id);
      if (!notUnique) {
        updateUser.friendRequests.push(request.body.from);

        User.updateOne({
          _id: request.body.to
        }, {$set: updateUser}).then(
          u => {
          }
        );
      }
    }
  );
});

router.post(routes.FRIEND_REQUEST_ACCEPTED, (request, response, next) => {

  User.findOne({
    _id: request.body.to
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      const notUnique = updateUser.friends.some(req => req._id === request.body.from._id);
      if (!notUnique) {
        updateUser.friends.push(request.body.from);
        const index = updateUser.friendRequestsPending.findIndex(element => element._id === request.body.from._id);
        updateUser.friendRequestsPending.splice(index, 1);
        User.updateOne({
          _id: request.body.to
        }, {$set: updateUser}).then(
          u => {
          }
        );
      }
    }
  );

  User.findOne({
    _id: request.body.from._id
  }).then(
    user=> {
      const updateUser = JSON.parse(JSON.stringify(user));
      const notUnique = updateUser.friends.some(element => element._id === request.body.to._id);
      if (!notUnique) {
        updateUser.friends.push(request.body.to);
        const index = updateUser.friendRequests.findIndex(element => element._id === request.body.to._id);
        updateUser.friendRequests.splice(index, 1);
        User.updateOne({
          _id: request.body.from._id
        }, {$set: updateUser}).then(
          u => {
            response.status(200).json(updateUser);
          }
        );
      } else {
        response.status(200).json(user);
      }
    }
  );

});


module.exports = router;
