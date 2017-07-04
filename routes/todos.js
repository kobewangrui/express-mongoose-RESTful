// 路由模块
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Todo = require('../models/Todo.js');

// GET
router.get('/', function(req, res, next) {
  console.log("1111111")
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

module.exports = router;