const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // for encrypting the passwords entered by user
const User = require("../model/user");
const TokenSchema = require("../model/blacklist-tokens");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth"); // check for the auth token
require("dotenv").config();
const MESSAGE = require("../shared/constants/messages.constant");
const ROUTES = require("../shared/constants/routes.constants");
const GLOBAL = require("../shared/constants/global.constants");
const GCP = require("../shared/constants/gcp.constants");
const STATUS = require("http-status-codes");
const formidable = require("formidable-serverless");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

router.post(ROUTES.AUTH.CHECK_AUTH, checkAuth, (request, response) => {
  User.findOne({ email: request.body.email })
    .select()
    .populate(GLOBAL.KEYS_TO_POPULATE_IN_USER_DATA)
    .exec()
    .then((user) => {
      if (!user) {
        invalidCredentials(response);
      } else {
        response.status(STATUS.OK).json({
          user: {
            token: request.headers.authorization,
            email: user.email,
            message: MESSAGE.SUCCESS.SUCCESS_LOGIN,
            displayName: user.displayName,
            _id: user._id,
            friendRequests: user.friendRequests,
            friendRequestsPending: user.friendRequestsPending,
            friends: user.friends,
            photoUrl: user.photoUrl,
          },
        });
      }
    })
    .catch((err) => {
      response.status(STATUS.UNAUTHORIZED).json(err);
    });
});

router.post(ROUTES.AUTH.SIGN_UP, (request, response) => {
  bcrypt.hash(request.body.password, 10).then(async (userPassword) => {
    const userDetails = JSON.parse(JSON.stringify(request.body));
    await User.findOne({ email: userDetails.email }, (err, res) => {
      console.log(res);
      response.status(STATUS.ACCEPTED).json({
        message: MESSAGE.SUCCESS.SUCCESS_LOGIN,
        user: res,
      });
    });
    userDetails["displayName"] =
      userDetails.firstName + " " + userDetails.lastName;
    userDetails["password"] = userPassword;
    userDetails["photoUrl"] = userDetails.photoUrl || "";
    userDetails["friends"] = [];
    userDetails["friendRequests"] = [];
    userDetails["friendRequestsPending"] = [];
    const user = new User(userDetails);
    user
      .save()
      .then((result) => {
        response.status(STATUS.CREATED).json({
          message: MESSAGE.SUCCESS.SUCCESS_CREATE,
          user: result,
        });
      })
      .catch((err) => {
        response.status(STATUS.CONFLICT).json(err);
      });
  });
});

router.post(ROUTES.AUTH.UPDATE_PASSWORD, (request, response) => {
  User.findOne({ email: request.body.email })
    .select()
    .exec()
    .then((user) => {
      bcrypt.hash(request.body.newpassword, 10).then((userPassword) => {
        user.password = userPassword;
        user.markModified("password");
        user
          .save()
          .then((result) => {
            response.status(STATUS.CREATED).json({
              message: MESSAGE.SUCCESS.SUCCESS_UPDATED,
              user: result,
            });
          })
          .catch((err) => {
            response.status(STATUS.CONFLICT).json(err);
          });
      });
    });
});

router.post(ROUTES.AUTH.LOG_IN, (request, response) => {
  User.findOne({ email: request.body.email })
    .select()
    .populate(GLOBAL.KEYS_TO_POPULATE_IN_USER_DATA)
    .exec()
    .then((user) => {
      if (!user) {
        invalidCredentials(response);
      } else {
        bcrypt
          .compare(request.body.password, user.password)
          .then((userState) => {
            if (userState) {
              const token = jwt.sign(
                { email: user.email, userId: user._id },
                GLOBAL.SECRET_KEY,
                { expiresIn: "365d" }
              );

              response.status(STATUS.OK).json({
                user: {
                  token: token,
                  displayName: user.displayName,
                  email: user.email,
                  _id: user._id,
                  friendRequests: user.friendRequests,
                  friendRequestsPending: user.friendRequestsPending,
                  friends: user.friends,
                  message: MESSAGE.SUCCESS.SUCCESS_LOGIN,
                  photoUrl: user.photoUrl,
                },
              });
            } else {
              invalidCredentials(response);
            }
          })
          .catch((error) => invalidCredentials(response));
      }
    })
    .catch((err) => {
      response.status(STATUS.UNAUTHORIZED).json(err);
    });
});

router.get(ROUTES.AUTH.LOG_OUT, (request, response) => {
  const token = new TokenSchema({ token: request.headers.authorization });
  token
    .save()
    .then((result) => response.status(STATUS.OK).json(result))
    .catch((err) => response.status(STATUS.CONFLICT).json(err));
});

router.post(ROUTES.AUTH.UPDATE_USER, (request, response) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (error, fields, files) => {
    console.log(fields, files);
    if (error) {
      response.status(400).json({
        error: MESSAGE.ERROR.PROBLEM_WITH_IMAGE,
      });
    } else {
      if (files) {
        if (files.picture) {
          if (files.picture.size > 10 * 1024 * 1024) {
            response.status(400).json({
              error: "File exceeds 3 mb",
            });
          } else {
            const gc = new Storage({
              keyFilename: path.join(
                __dirname,
                "../../bemeanstack-fc78c23520d4.json"
              ),
              projectId: "bemeanstack",
            });
            const imagesbucketName = "images-bemeanstack";
            const imagesBucket = gc.bucket(imagesbucketName);

            const localReadStream = fs.createReadStream(files.picture.path);
            const remoteWriteStream = imagesBucket
              .file(`Profile Pictures/${fields._id}/${files.picture.name}`)
              .createWriteStream({
                resumable: false,
                gzip: true,
              });

            localReadStream
              .pipe(remoteWriteStream)
              .on("error", function (err) {})
              .on("finish", function (abc) {
                console.log("uploaded");
                User.findByIdAndUpdate(
                  { _id: fields._id },
                  {
                    photoUrl: `${
                      GCP.BASE_URL + imagesbucketName
                    }/Profile Pictures/${fields._id}/${files.picture.name}`,
                  }
                ).then((result) => {
                  response.status(STATUS.OK).json(result);
                });
              });
          }
        }
      }
    }
  });
});
router.post(ROUTES.AUTH.GET_USER, (request, response) => {
  User.findOne({ email: request.body.email })
    .populate(
      GLOBAL.KEYS_TO_POPULATE_IN_USER_DATA,
      GLOBAL.REMOVE_NOT_REQUIRED_KEYS_FROM_USER_DATA
    )
    .then((user) => {
      console.log(request.body);
      response.status(STATUS.ACCEPTED).json({
        message: MESSAGE.SUCCESS.SUCCESS_LOGIN,
        user,
      });
    })
    .catch((err) => {
      response.status(STATUS.UNAUTHORIZED).json(err);
    });
});

function invalidCredentials(response) {
  response.status(STATUS.UNAUTHORIZED).json({
    message: MESSAGE.INVALID_CREDENTIALS,
  });
}
module.exports = router;
