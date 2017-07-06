var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');
var User = require('../models/User.js');

/* GET /todos listing. */
router.get(`/getList`, function(req, res, next){
  Todo.find(function (err, resp) {
    if (err) return next(err);
    res.json(resp);
  });
});



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



router.get('/addTodos', function(req, res, next){
  let newTodos = new Todo({
    name:"www",
    completed:true,
    date:new Date()
  })
  newTodos.save(function (err, resp) {
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
  let arg = {
    name:req.body.name,
    age:req.body.age
  };
  console.log(arg)
  User.find(arg, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* POST /todos */
router.post('/addTodos', function(req, res, next){
  Todo.create(req.body, function (err, post){
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/search/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
