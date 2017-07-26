var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  productId:{
    type:Number,
    required:true,
    unique:true,
    default:Date.now
  },
  title:{
    type:String,
    required:'标题不能为空',
  },
  date: {
    type:Date,
    default:Date.now,
  },
  price:{
    type:Number,
    required:'价格不能为空'
  },
  spicialPrice:{
    type:Number,
    required:'特价不能为空'
  },
  allowance:{
    type:Number,
    required:'余量不能为空'
  },
  imgUrl:{
    type:Array,
  },
});

module.exports = mongoose.model('Product', TodoSchema);
