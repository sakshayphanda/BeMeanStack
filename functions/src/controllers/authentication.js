const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for encrypting the passwords entered by user
const User = require('../model/user');


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(
        userPassword => {
          const userDetails = JSON.parse(JSON.stringify(req.body));
          userDetails.password = userPassword;
          const user = new User(userDetails);
          user.save().then(
            result => {
              res.status(201).json({
                message: 'Successfully created',
                result: result
              });
            }
          )
            .catch(
              err => {
                res.status(401).json(err);
              }
            );
        });
  });

router.post('/login',
  (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(
        user => {

          if (!user) {
            res.status(401).json({
              message: 'Invalid credentials'
            })
          } else {
            bcrypt.compare(req.body.password, user.password)
            .then(
              user => {
                if(user) {
                res.status(201).json(
                  {
                    message: 'Successfully logged in'
                  });
              } else {
                res.status(401).json({
                  message: 'Invalid credentials'
                })
              }
            }
            )
            .catch(
              error =>  {
                res.status(401).json(error);
            });
          }
        }
      )
      .catch(
        err => {
          res.status(401).json(err);
        }
      );
  }
);
module.exports = router;
