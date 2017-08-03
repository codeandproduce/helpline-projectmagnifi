const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var User = mongoose.Schema({
  id: ObjectId,
  email:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true
  }
});

var User = module.exports = mongoose.model('User', User, 'user');
