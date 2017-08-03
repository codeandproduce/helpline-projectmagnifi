const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Message = mongoose.Schema({
  id: ObjectId,
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  fromname: {
    type: String
  },
  fromu:{
    type:String
  },
  message:{
    type: String
  },
  type:{
    type: String
  }
});

var Message = module.exports = mongoose.model('Message', Message, 'messages');
