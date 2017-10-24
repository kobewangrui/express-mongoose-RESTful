var express = require('express');
var router = express.Router();

var Product = require('../../models/Product.js');

/* GET 获取产品列表. */
router.get(`/getList`, function(req, res, next){
  Product.find(function(err, resp){
    if (err) return next(err);
    res.json(resp);
  });
});

// post  添加产品
router.post('/addProduct', function(req, res, next){
  let params = req.body
  let arg = {
    title : params.title,
    price : params.price,
    spicialPrice : params.spicialPrice,
    allowance : params.allowance
  };
  Product.create(arg, function(err, post){
    if (err) return next(err);
    res.json({status:200,msg:'添加成功'});
  });
});

/* GET get查询 */
router.get('/search', function(req, res, next){
  let arg = {};
  if(req.query.productId!=='' && req.query.productId!==undefined){
    arg.productId = req.query.productId;
  }
  Product.find(arg,function(err, resp){
    if (err) return next(err);
    res.json(resp);
  });
});


/* DELETE /todos/:id */
// router.post('/:id', function(req, res, next) {
//   Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
