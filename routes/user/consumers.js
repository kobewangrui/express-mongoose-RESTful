var express = require('express');
var router = express.Router();
var User = require('../../models/User.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/index');
var passport = require('passport');

require('./passport')(passport);

// 注册账户
router.post('/register', function(req, res, next){
  let newUser = {//body x-www-urlencoded
    userName:req.body.userName,
    passWord:req.body.passWord,
    phone:req.body.phone
  };
  User.create(newUser,function(err, post){
    if (err) return next(err);
    res.json({'code':200,'msg':'注册成功'})
  });
});

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/accesstoken', (req, res) => {
  User.findOne({
    userName: req.body.userName
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success: false, message:'认证失败,用户不存在!'});
    } else if(user) {
      // 检查密码是否正确
      user.comparePassword(req.body.passWord, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({userName: user.userName}, config.secret,{
            expiresIn: 10080  // token到期时间设置
          });
          user.token = token;
          user.save(function(err){
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '验证成功!',
            token: 'Bearer ' + token,
            userName: user.userName
          });
        } else {
          res.send({success: false, message: '认证失败,密码错误!'});
        }
      });
    }
  });
});


// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/info',
passport.authenticate('bearer', { session: false }),
function(req, res) {
  res.json({userName: req.user.name});
});





// 登录
router.post('/login',function(req,res,next){
  User.findOne({'userName':req.body.userName},function(err,post){
    if (err) return next(err);
    if(post.passWord === req.body.passWord){
      req.session.userName = post.userName
      res.json({'code':200,'msg':'登录成功'})
    }else{
      res.json({'code':500,'msg':'密码错误'})
    }
  })
  
})

// 判断是否登录
router.get('/',function(req,res,next){
  if(req.session.userName){
      res.json({'code':200,'msg':'登录成功','userName':req.session.userName})
  }else{
      res.json({'code':500,'msg':'尚未登录'
    
    
    })
  }
})

// 退出
router.post('/logout',function(req,res,next){
  if(req.session.userName){
    delete req.session.userName;
    res.json({'code':200,'msg':'登出成功'})
  }else{
    res.json({'code':500,'msg':'登出失败'})
  }
})



  router.get('/getUser', function(req, res, next){
    User.find(function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });
  
  router.get('/updateUser', function(req, res, next){
    let before = {"name":"王睿龙"};
    let update = {"age":33}
    User.update(before,update,function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });


// get查询年龄
router.get('/searchUser', function(req, res, next) {
  User.find({"age":req.query.age}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// post查询年龄
router.post('/searchs', function(req, res, next) {
  let arg = {};
  if(req.body.name !== '' && req.body.name !== undefined){
      arg.name = req.body.name
  }
  if(req.body.age !== '' && req.body.age !== undefined){
    arg.age = req.body.age
  }
  User.find(arg, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
