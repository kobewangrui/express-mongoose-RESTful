var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  date: Date
});

module.exports = mongoose.model('Todo', TodoSchema);
