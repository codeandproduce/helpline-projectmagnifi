const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var MessageCollection = mongoose.Schema({
  id: ObjectId,
  chatId: {
    type: String
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

var Message = module.exports = mongoose.model('MessageCollection', MessageCollection, 'messages');
