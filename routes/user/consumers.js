var express = require('express');
var router = express.Router();
var User = require('../../models/User.js');


router.get('/addUser', function(req, res, next){
  let newUser = new User({
    name:"王睿龙2号",
    sex:0,
    age:24,
    date:new Date()
  })
  newUser.save(function (err, resp) {
    if (err) return next(err);
    res.json(resp);
  });
});

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
