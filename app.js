var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// 设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");//一般不写*，写域名
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Request-Headers","X-requested-with");    
//     res.header("Access-Control-Allow-Headers","Content-Type");
//     next();
// });

// 引入连接mongoDB模块
require('./connect/')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 自动解析前端的applicatoin/json请求体
app.use(bodyParser.json());
// 自动解析前端的applicatoin/x-www-form-urlencoded请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sessiontest'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'sessiontest', // 用来对session id相关的cookie进行签名
  resave:false,  // 是否每次都重新保存会话，建议false
  saveUninitialized:false  // 是否自动保存未初始化的会话，建议false
}));

// 路由
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/product', require('./routes/product/products'));
app.use('/api/consumers',require('./routes/user/consumers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
