const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var messages = new Schema({
  from: String,
  message: String
});
var MessageCollection = mongoose.Schema({
  id: ObjectId,
  chatId: {
    type: String
  },
  fromname: {
    type: String
  },
  messagesArray:[messages],
  type:{
    type: String
  }
});

var Message = module.exports = mongoose.model('MessageCollection', MessageCollection, 'messages');
