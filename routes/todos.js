var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');
var User = require('../models/User.js');

/* GET /todos listing. */
router.get('/getList', function(req, res, next){
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
  console.log(req.body)
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




/* POST /todos */
router.post('/', function(req, res, next){
  Todo.create(req.body, function (err, post){
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
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
