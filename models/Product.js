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
    required:true,
  },
  date: {
    type:Date,
    default:Date.now,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  spicialPrice:{
    type:Number,
    required:true
  },
  allowance:{
    type:Number,
    required:true
  },
  imgUrl:{
    type:Array,
  },
});

module.exports = mongoose.model('Product', TodoSchema);
