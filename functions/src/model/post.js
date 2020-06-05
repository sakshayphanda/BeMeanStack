const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator'); // a package to validate the unique keys like email

// just a blueprint or a model
const postSchema = mongoose.Schema({
 // userId: { type: String, required: true},
  text: { type: String, required: true },
  imageUrl: {type: String, required: false},
  user: { type: Schema.Types.ObjectId, ref: 'User' }
  // attachment: { data: Buffer, contentType: String, required: false}
});

// postSchema.plugin(uniqueValidator); // a method provided by mongoose

// first argument is the name of the model/collection, 2nd is the schema defined above
module.exports = mongoose.model('Post', postSchema);
