const express = require('express');
const app = express();
const mongoose = require('mongoose'); // interacts with the mongo db
const bodyParser = require('body-parser'); // to parse the incoming object into Json
const bcrypt = require('bcryptjs'); // for encrypting the passwords entered by user
const jwt = require('jsonwebtoken');
const User = require('./model/user/user');

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});


app.post('/signin',
  (req, res, next) => {
    console.log(req.body);
    console.log(req.url, 'checking auth ...');

    const user = new User(req.body);
    user.save().then(
      result => {
        res.status(201).json({
          message: 'Successfully created',
        result: result});
      }
    )
    .catch(
      err => {
        res.status(500).json({
          message: err
        });
      }
    );
  }
);

// app.use(
//   (req, res, next) => {
//     console.log(req.url);
//     res.status(200).send('Hello from express');
//   }
// );


// connection is created using mongoose (an external library added)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://sakshayphanda:SX49Enk2QlrZfXD7@bemeanstack-b1ev1.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err, 'Can not connect to the database');
  });


module.exports = app;
