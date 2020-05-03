const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // a package to validate the unique keys like email

// just a blueprint or a model
const tokenSchema = mongoose.Schema({
  token: {type: String, required: true, unique: true }
});

tokenSchema.plugin(uniqueValidator); // a method provided by mongoose

// first argument is the name of the model/collection, 2nd is the schema defined above
module.exports = mongoose.model('BlacklistedToken', tokenSchema);
