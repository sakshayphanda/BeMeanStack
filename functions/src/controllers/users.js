const router = require('express').Router();
const routes = require('../constants/routes.constants');
const User = require('../model/user');


router.get(routes.GET_ALL_USERS, async (_request, response) => {
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

router.post(routes.FRIEND_REQUEST, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {
    const toUserUnique = !toUser.friendRequests.some(req => req._id === fromUser._id);
    const fromUserUnique = !fromUser.friendRequestsPending.some(req => req._id === toUser._id);
    const alreadyFriend = fromUser.friends.some(req => req._id === toUser._id);
    if (toUserUnique && fromUserUnique && !alreadyFriend) {
      const toUserWithoutFriendInfo = JSON.parse(JSON.stringify(toUser));
      delete toUserWithoutFriendInfo.friendRequests;
      delete toUserWithoutFriendInfo.friendRequestsPending;
      delete toUserWithoutFriendInfo.password;
      const fromUserWithoutFriendInfo = JSON.parse(JSON.stringify(fromUser));
      delete fromUserWithoutFriendInfo.friendRequests;
      delete fromUserWithoutFriendInfo.friendRequestsPending;
      delete fromUserWithoutFriendInfo.password;
      toUser.friendRequests.push(fromUserWithoutFriendInfo);
      fromUser.friendRequestsPending.push(toUserWithoutFriendInfo);
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
      const index = fromUser.friendRequests.findIndex(req => req._id === request.body.from);
      fromUser.friendRequests.splice(index, 1);
      const index1 = toUser.friendRequestsPending.findIndex(req => req._id === request.body.to);
      toUser.friendRequestsPending.splice(index1, 1);

      const toUserWithoutFriendInfo = JSON.parse(JSON.stringify(toUser));
      delete toUserWithoutFriendInfo.friendRequests;
      delete toUserWithoutFriendInfo.friendRequestsPending;
      delete toUserWithoutFriendInfo.password;
      const fromUserWithoutFriendInfo = JSON.parse(JSON.stringify(fromUser));
      delete fromUserWithoutFriendInfo.friendRequests;
      delete fromUserWithoutFriendInfo.friendRequestsPending;
      delete fromUserWithoutFriendInfo.password;

      toUser.friends.push(fromUserWithoutFriendInfo);
      fromUser.friends.push(toUserWithoutFriendInfo);
      await User.updateOne({_id: fromUser._id}, {$set: fromUser});
      await User.updateOne({_id: toUser._id}, {$set: toUser});
      response.status(200).json(fromUser);
    } else {
      response.status(200).json(fromUser);
    }
  }
});

router.post(routes.FRIEND_REQUEST_REJECTED, async (request, response, next) => {
  const toUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.to})));
  const fromUser = JSON.parse(JSON.stringify( await User.findOne({_id: request.body.from})));
  if (toUser && fromUser) {
    const isToUserUnique = !toUser.friends.some(req => req._id === fromUser._id);
    const isFromUserUnique = !fromUser.friends.some(req => req._id === toUser._id);
    if (isToUserUnique && isFromUserUnique) {
      const index = fromUser.friendRequests.findIndex(req => req._id === request.body.from);
      fromUser.friendRequests.splice(index, 1);
      const index1 = toUser.friendRequestsPending.findIndex(req => req._id === request.body.to);
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

    const isToUserFriend = toUser.friends.some(req => req._id === fromUser._id);
    const isFromUserFriend = fromUser.friends.some(req => req._id === toUser._id);
    console.log(isFromUserFriend, isToUserFriend);

    if (isToUserFriend && isFromUserFriend) {

      const index = fromUser.friends.findIndex(req => req._id === request.body.from);
      fromUser.friends.splice(index, 1);
      const index1 = toUser.friends.findIndex(req => req._id === request.body.to);
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
