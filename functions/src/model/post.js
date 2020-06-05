const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // a package to validate the unique keys like email

// just a blueprint or a model
const postSchema = mongoose.Schema({
  user: { type: Map, required: true},
  text: { type: String, required: true },
  imageUrl: {type: String, required: false}
  // attachment: { data: Buffer, contentType: String, required: false}
});

// postSchema.plugin(uniqueValidator); // a method provided by mongoose

// first argument is the name of the model/collection, 2nd is the schema defined above
module.exports = mongoose.model('Post', postSchema);
