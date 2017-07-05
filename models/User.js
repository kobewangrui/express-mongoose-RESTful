var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  name: String,
  sex: Number,
  age: Number,
  date:Date
});
module.exports = mongoose.model('User', TodoSchema);