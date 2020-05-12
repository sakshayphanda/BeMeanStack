const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for encrypting the passwords entered by user
const User = require('../model/user');
const TokenSchema = require('../model/blacklist-tokens');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth'); // check for the auth token
require('dotenv').config();
const MESSAGE = require('../constants/messages.constant');
const ROUTES = require('../constants/routes.constants');
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
            invalidCredentials(response);
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
                        user: {
                          token: token,
                          displayName: user.firstName + ' ' +  user.lastName,
                          email: user.email,
                          message: MESSAGE.SUCCESS_LOGIN
                        }
                      });
                  } else {
                    invalidCredentials(response);
                  }
                }
              )
              .catch(
                error => {
                  console.log(error);

                  invalidCredentials(response);
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

router.post(ROUTES.CHECK_AUTH,checkAuth,  (request, response) => {
  User.findOne({ email: request.body.email })
    .then(
      user => {
        if (!user) {
          invalidCredentials(response);
        } else {
          response.status(STATUS.OK).json({
            user: {
              token: request.headers.authorization,
              displayName: user.firstName + ' ' +  user.lastName,
              email: user.email,
              message: MESSAGE.SUCCESS_LOGIN
            }
          });
        }
      }
    )
    .catch(
      err => {
        response.status(STATUS.UNAUTHORIZED).json(err);
      }
    );
});

router.get(ROUTES.LOG_OUT, (request, response) => {
  const token = new TokenSchema({token: request.headers.authorization});

  token.save().then(
    result => {
      response.status(STATUS.OK).json(result);
    }
  )
    .catch(
      err => {
        response.status(STATUS.CONFLICT).json(err);
      }
    );
});

function invalidCredentials(response) {
  response.status(STATUS.UNAUTHORIZED).json({
    message: MESSAGE.INVALID_CREDENTIALS
  })
}
module.exports = router;
