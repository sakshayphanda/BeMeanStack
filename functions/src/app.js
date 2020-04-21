const express = require('express');
const app = express();
const mongoose = require('mongoose'); // interacts with the mongo db
const bodyParser = require('body-parser'); // to parse the incoming object into Json
app.use(bodyParser.json());

app.get('/',
  (req, res, next) => {
    console.log(req.url, 'this is a middleware');
    next();
  }
);

app.use(
  (req, res, next) => {
    console.log(req.url);
    res.send('Hello from express');
  }
);

app.use((request,response,next) => {
  response.setHeader("Access-Control-Allow-Origin","*");
  response.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  response.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// connection is created using mongoose (an external library added)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://sakshayphanda:SX49Enk2QlrZfXD7@bemeanstack-b1ev1.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to the database');
})
.catch(err=> {
  console.log(err, 'Can not connect to the database');
});


module.exports = app;