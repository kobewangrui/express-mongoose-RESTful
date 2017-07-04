// Todo模型
let mongoose = require('mongoose');
let TodoSchema = new mongoose.Schema({
    name:String,
    completed:Boolean,
    note:{
        type:String,
        default:''
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Todo',TodoSchema);