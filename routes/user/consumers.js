var express = require('express');
var router = express.Router();
var User = require('../../models/User.js');

// 注册账户
router.post('/register', function(req, res, next){
  let newUser = {
    userName:req.body.userName,
    passWord:req.body.passWord,
    phone:req.body.phone
  };
  User.create(newUser,function(err, post){
    if (err) return next(err);
    res.json(post);
  });
});


// 登录
router.post('/login',function(req,res,next){
  User.findOne({'userName':req.body.userName},function(err,post){
    if (err) return next(err);
    if(post.passWord === req.body.passWord){
      req.session.userName = post.userName
      res.json({'code':'200','msg':'登录成功'})
    }else{
      res.json({'code':'500','msg':'密码错误'})
    }
  })
})

// 判断是否登录
router.get('/',function(req,res,next){
  if(req.session.userName){
      res.json({'code':200,'msg':'登录成功'})
  }else{
      res.json({'code':500,'msg':'尚未登录'})
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
