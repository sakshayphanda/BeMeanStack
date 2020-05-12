const router = require('express').Router();
const routes = require('../constants/routes.constants');
const User = require('../model/user');


router.get(routes.GET_ALL_USERS, (request, response, next) => {
  User.find({}).then(
    users=> {
      console.log(users);
      const usernames = users.map(user => user.firstName + ' ' + user.lastName);
      response.status(200).json(usernames);
    }
  );
})


module.exports = router;
