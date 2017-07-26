var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:'用户名不能为空',
    unique:true,
  },
  passWord:{
    type:String,
    required:'密码不能为空'
  },
  phone:{
    type:String,
    required:'电话号码不能为空',
    unique:true
  },
  userType:{
    type:Number,
    required:'角色类型不能为空',
    default:1
  }
});
// 此处的User对应mongodb的collections 并将它转为小写，末尾没有s则加上s(也就是创建表)
module.exports = mongoose.model('User', TodoSchema);