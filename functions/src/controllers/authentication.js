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
const formidable = require('formidable-serverless');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');


router.post(ROUTES.SIGN_UP,
  (request, response) => {
    bcrypt.hash(request.body.password, 10)
      .then(
        userPassword => {
          const userDetails = JSON.parse(JSON.stringify(request.body));
          userDetails['displayName'] = userDetails.firstName + ' ' + userDetails.lastName;
          userDetails['password'] = userPassword;
          userDetails['photoUrl'] = 'https://cdn1.iconfinder.com/data/icons/big-rocket/80/BigRocket-1-01-512.png';
          userDetails['friends'] = [];
          userDetails['friendRequests'] = [];
          userDetails['friendRequestsPending'] = [];
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
                          displayName: user.displayName,
                          email: user.email,
                          _id: user._id,
                          friendRequests: user.friendRequests,
                          friendRequestsPending: user.friendRequestsPending,
                          friends: user.friends,
                          message: MESSAGE.SUCCESS_LOGIN,
                          photoUrl: user.photoUrl
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

router.post(ROUTES.CHECK_AUTH, checkAuth, (request, response) => {
  User.findOne({ email: request.body.email })
    .then(
      user => {
        if (!user) {
          invalidCredentials(response);
        } else {
          response.status(STATUS.OK).json({
            user: {
              token: request.headers.authorization,
              email: user.email,
              message: MESSAGE.SUCCESS_LOGIN,
              displayName: user.displayName,
              _id: user._id,
              friendRequests: user.friendRequests,
              friendRequestsPending: user.friendRequestsPending,
              friends: user.friends,
              photoUrl: user.photoUrl
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
  const token = new TokenSchema({ token: request.headers.authorization });

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

router.post(ROUTES.UPDATE_USER, (request, response) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (error, fields, files) => {
    console.log(fields, files);
    if (error) {
      response.status(400).json({
        error: "problem with the image"
      });
    } else {

      if (files) {
        if (files.picture) {
          if (files.picture.size > 10 * 1024 * 1024) {
            response.status(400).json({
              error: "File exceeds 3 mb"
            });
          } else {
            const gc = new Storage({
              keyFilename: path.join(__dirname, '../../bemeanstack-fc78c23520d4.json'),
              projectId: 'bemeanstack'
            });
            const imagesbucketName = 'images-bemeanstack';
            const imagesBucket = gc.bucket(imagesbucketName);

            const localReadStream = fs.createReadStream(files.picture.path);
            const remoteWriteStream = imagesBucket.file( `Profile Pictures/${fields._id}/${files.picture.name}`).createWriteStream(
              {
                resumable: false,
                gzip: true
              }
            );

            localReadStream.pipe(remoteWriteStream)
              .on('error', function (err) { })
              .on('finish', function (abc) {
                console.log('uploaded');
                User.findByIdAndUpdate({_id: fields._id}, {photoUrl: `https://storage.googleapis.com/${imagesbucketName}/Profile Pictures/${fields._id}/${files.picture.name}`})
                .then(
                  result => {
                    console.log(result);

                  }
                );

              });
          }
        }

      }
    }
  });
});

function invalidCredentials(response) {
  response.status(STATUS.UNAUTHORIZED).json({
    message: MESSAGE.INVALID_CREDENTIALS
  })
}
module.exports = router;
