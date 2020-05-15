const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // a package to validate the unique keys like email

// just a blueprint or a model
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: false},
  displayName: {type: String, required: true},
  friendRequests: {type: Array, required: true},
  friendRequestsPending: {type: Array, required: true},
  friends: {type: Array, required: true},
  photoUrl: {type: String, required: false}
});

userSchema.plugin(uniqueValidator); // a method provided by mongoose

// first argument is the name of the model/collection, 2nd is the schema defined above
module.exports = mongoose.model('User', userSchema);
