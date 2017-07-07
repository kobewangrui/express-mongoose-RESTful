var express = require('express');
var router = express.Router();

var Todo = require('../../models/Todo.js');

/* GET /todos listing. */
router.get(`/getList`, function(req, res, next){
  Todo.find(function (err, resp) {
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
