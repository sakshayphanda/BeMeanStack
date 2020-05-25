const express = require('express');
const app = express();
const mongoose = require('mongoose'); // interacts with the mongo db
const bodyParser = require('body-parser'); // to parse the incoming object into Json
app.use(bodyParser.json());
const authRoute = require('./controllers/authentication');
const usersRoute = require('./controllers/users');
const postsRoute = require('./controllers/posts');

const GLOBAL = require('./constants/global.constants');

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// connection is created using mongoose (an external library added)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://'+ process.env.MONGO_USER_PASS + '@bemeanstack-b1ev1.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err, 'Can not connect to the database');
  });

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/posts', postsRoute)

module.exports = app;
