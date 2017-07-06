var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  name: String,
  sex: Number,
  age: Number,
  date:Date
});
// 此处的User对应mongodb的collections 并将它转为小写，末尾没有s则加上s(也就是创建表)
module.exports = mongoose.model('User', TodoSchema);