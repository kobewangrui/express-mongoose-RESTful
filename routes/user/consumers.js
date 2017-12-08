var express = require('express');
var router = express.Router();
var User = require('../../models/User.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/index');
var passport = require('passport');

require('./passport')(passport);

// 注册账户
router.post('/register', function(req, res, next){
  if(!req.body.userName || !req.body.passWord){
    res.json({'code':404,'msg':'用户名或密码为空'});
  }else{
    let newUser = User({//body x-www-urlencoded
      userName:req.body.userName,
      passWord:req.body.passWord,
      phone:req.body.phone
    });
    newUser.save((err)=>{
      if(err){
        return res.json({'code':500,'msg':'该用户名/手机号已注册过'});
      }else{
        res.json({'code':200,'msg':'注册成功'})
      }
    });
  }

});

// 检查用户名与密码,如果验证通过,生成一个token
router.post('/accesstoken', (req, res) => {
  User.findOne({
    userName: req.body.userName
  }, (err, user) => {
    if(err){
      return next(err);
    }else{
      if(!user){
        res.json({success: false, message:'生成token失败,用户不存在!'});
      }else{
        // 检查密码是否正确
        user.comparePassword(req.body.passWord, (err, isMatch) => {//验证密码
          if(isMatch && !err){
            user.token = jwt.sign({userName: user.userName}, config.secret,{expiresIn: '1'  });//expiresIn: token到期时间设置
            user.update({token:user.token},(err)=>{
              if (err) {
                res.send(err);
              }
            });
          res.json({
            success: true,
            message: '成功生成token!',
            token: 'Bearer ' + user.token,
            userName: user.userName
          });
          }else{
            res.send({success: false, message: '生成token失败,密码错误!'});
          }
        });
      }
    }
  });
});


// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/info',passport.authenticate('bearer', { session: false }),(req, res)=>{
    res.json({userName: req.user.userName});
});


// 登录 并且验证密码
router.post('/login', (req, res) => {
  User.findOne({
    userName: req.body.userName
  }, (err, user) => {
      // 检查密码是否正确
      if(err){
        return next(err);
      }else{
        if (!user) {
          res.json({success: false, message:'用户不存在!'});
        }else{
          user.comparePassword(req.body.passWord, (err, isMatch) => {//验证密码
            if (isMatch && !err) {
              res.json({'code':200,'msg':'登录成功'})
            } else {
              res.json({'code':500,'msg':'密码错误'})
            }
          });
        }
    }
  });
});

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



  router.get('/getUser', passport.authenticate('bearer', { session: false }),function(req, res, next){//权限验证获取user list
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
router.post('/searchs', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  let arg = {};
  if(req.body.name !== '' && req.body.name !== undefined){
      arg.userName = req.body.name
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
