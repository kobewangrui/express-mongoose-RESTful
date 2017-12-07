var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
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
  token:{
    type:String,
  },
  userType:{
    type:Number,
    required:'角色类型不能为空',
    default:1
  }
});
// 此处的User对应mongodb的collections 并将它转为小写，末尾没有s则加上s(也就是创建表)


// 添加用户保存时，中间件对password进行bcryptjs加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save',function(next){
  var user = this
  var rounds = 10;  // 处理数据的回合默认是10
  bcrypt.genSalt(10,function (err, salt){
        if (err) {
            return next(err);
        }else{
          bcrypt.hash(user.passWord,salt,function(err,hash){
            if(err){
              return next(err)
            }else{
              user.passWord = hash
              next()
            }
          })
        };
    })
})

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw) {
  bcrypt.compare(passw, this.passWord, (err, isMatch) => {
      if (err) {
          return cb(err);
      }else{
        
      }
  });
};

module.exports = mongoose.model('User', UserSchema);