const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for encrypting the passwords entered by user
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth'); // check for the auth token
require('dotenv').config();
const MESSAGE = require('../constants/messages.constant');
const ROUTES = require('../constants/user-routes.constants');
const GLOBAL = require('../constants/global.constants');
const STATUS = require('http-status-codes');


router.post(ROUTES.SIGN_UP,
  (request, response) => {
    bcrypt.hash(request.body.password, 10)
      .then(
        userPassword => {
          const userDetails = JSON.parse(JSON.stringify(request.body));
          userDetails.password = userPassword;
          const user = new User(userDetails);
          user.save().then(
            result => {
              response.status(STATUS.CREATED).json(
                {
                  message: MESSAGE.SUCCESS_CREATE,
                  user: result
                });
            }
          )
            .catch(
              err => {
                response.status(STATUS.CONFLICT).json(err);
              }
            );
        });
  });

router.post(ROUTES.LOG_IN,
  (request, response) => {
    User.findOne({ email: request.body.email })
      .then(
        user => {
          if (!user) {
            invalidCredentials();
          } else {
            bcrypt.compare(request.body.password, user.password)
              .then(
                userState => {
                  if (userState) {
                    const token = jwt.sign({ email: user.email, userId: user._id },
                      process.env.JWT_KEY, { expiresIn: GLOBAL.SESSION_TIMEOUT }
                    );
                    response.status(STATUS.OK).json(
                      {
                        token: token,
                        displayName: user.firstName + ' ' +  user.lastName,
                        email: user.email,
                        message: MESSAGE.SUCCESS_LOGIN
                      });
                  } else {
                    invalidCredentials();
                  }
                }
              )
              .catch(
                error => {
                  response.status(STATUS.UNAUTHORIZED).json(error);
                });
          }
        }
      )
      .catch(
        err => {
          response.status(STATUS.UNAUTHORIZED).json(err);
        }
      );
  }
);

function invalidCredentials() {
  response.status(STATUS.UNAUTHORIZED).json({
    message: MESSAGE.INVALID_CREDENTIALS
  })
}
module.exports = router;
