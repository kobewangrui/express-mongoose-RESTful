// 路由模块
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Todo = require('../models/Todo.js');

// GET
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// POST
router.post('/', function(req, res, next) {
  Todo.create(req.body,function (err, todos) {
    if (err) return next(err);
    res.json(post);
  });
});

// GET 传id
router.get('/:id',function(req,res,next){
    Todo.findById(req.params.id,function(err,post){
        if(err) return next(err);
        res.json(post);
    })
})

// PUT 传id
router.put('/:id',function(req,res,next){
    Todo.findByIdAndUpdate(req.params.id,req.body,function(err,post){
        if(err) return next(err);
        res.json(post)
    })
})

// DELETE 传id
router.delete('/:id',function(req,res,next){
    Todo.findByIdAndRemove(req.params.id,req.body,function(err,post){
        if(err) return next(err);
        res.json(post)
    })
})


module.exports = router;