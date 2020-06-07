const router = require('express').Router();
const routes = require('../constants/routes.constants');
const User = require('../model/user');


router.get(routes.GET_ALL_USERS, async (_request, response) => {
  let users = await User.find()
  .select('-friendRequests -friendRequestsPending')
  .exec();
  response.status(200).json(users);
});

router.post(routes.FRIEND_REQUEST, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {
    const toUserUnique = !toUser.friendRequests.some(req => req === request.body.from);
    const fromUserUnique = !fromUser.friendRequestsPending.some(req => req === request.body.to);
    const alreadyFriend = fromUser.friends.some(req => req === request.body.to);
    if (toUserUnique && fromUserUnique && !alreadyFriend) {
      toUser.friendRequests.push(request.body.from);
      fromUser.friendRequestsPending.push(request.body.to);
      await User.updateOne({_id: fromUser._id}, {$set: fromUser});
      await User.updateOne({_id: toUser._id}, {$set: toUser});
      response.status(200).json(fromUser);
    } else {
      response.status(200).json(fromUser);
    }
  }
});

router.post(routes.FRIEND_REQUEST_ACCEPTED, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {
    const isToUserUnique = !toUser.friends.some(req => req._id === fromUser._id);
    const isFromUserUnique = !fromUser.friends.some(req => req._id === toUser._id);
    if (isToUserUnique && isFromUserUnique) {
      const index = fromUser.friendRequests.findIndex(req => req === toUser._id);
      fromUser.friendRequests.splice(index, 1);
      const index1 = toUser.friendRequestsPending.findIndex(req => req === fromUser._id);
      toUser.friendRequestsPending.splice(index1, 1);
      toUser.friends.push(request.body.from);
      fromUser.friends.push(request.body.to);
      await User.updateOne({_id: fromUser._id}, {$set: fromUser});
      await User.updateOne({_id: toUser._id}, {$set: toUser});
    }
    response.status(200).json(fromUser);

  }
});

router.post(routes.FRIEND_REQUEST_REJECTED, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {
    const isToUserUnique = !toUser.friends.some(req => req === fromUser._id);
    const isFromUserUnique = !fromUser.friends.some(req => req === toUser._id);
    if (isToUserUnique && isFromUserUnique) {
      const index = fromUser.friendRequests.findIndex(req => req === request.body.from);
      fromUser.friendRequests.splice(index, 1);
      const index1 = toUser.friendRequestsPending.findIndex(req => req === request.body.to);
      toUser.friendRequestsPending.splice(index1, 1);
      await User.updateOne({_id: fromUser._id}, {$set: fromUser});
      await User.updateOne({_id: toUser._id}, {$set: toUser});
      response.status(200).json(fromUser);
    } else {
      response.status(200).json(fromUser);
    }
  }
});

router.post(routes.UNFRIEND, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {

    const isToUserFriend = toUser.friends.some(req => req === fromUser._id);
    const isFromUserFriend = fromUser.friends.some(req => req === toUser._id);
    if  (isFromUserFriend) {
      const index = fromUser.friends.findIndex(req => req === request.body.from);
      fromUser.friends.splice(index, 1);
      const index1 = toUser.friends.findIndex(req => req === request.body.to);
      toUser.friends.splice(index1, 1);
      await User.updateOne({_id: fromUser._id}, {$set: fromUser});
      await User.updateOne({_id: toUser._id}, {$set: toUser});
      response.status(200).json(fromUser);
    } else {
      response.status(200).json(fromUser);
    }
  }
});


module.exports = router;
