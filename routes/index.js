const express = require('express');
const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');

const User = require('./../models/user');
const MessageCollection = require('./../models/message');

const ObjectId = require('mongoose').Schema.ObjectId;

var csrfProtection = csrf();
// var parseForm = bodyParser.urlencoded({ extended: false })

// hbs.registerHelpter('useroradmin', (user) => {
//   if(user == 'user'){
//     return 'user';
//   }else{
//     return 'admin';
//   }
// });

function requireLogin(req,res,next){
  if(!req.user){
    res.redirect('/admin/chatroomadmin/login');
  }else{
    next();
  }
}

var attempts = 0;



router.get('/', csrfProtection, (req, res) => {
  res.render('startchat', { csrfToken: req.csrfToken() });
});
router.post('/', csrfProtection, (req, res) => {
  var name = '';
  if(!req.body.name){
    name = 'Anonymous';
  }else{
    name = req.body.name;
  }
  var init = new MessageCollection({
    fromname: name,
    type: 'init'
  });
  init.save((err) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/chatroom/'+init._id);
    }
  });
});
router.get('/chatroom/:chatId', (req, res) => {
  var time = moment().format('MMMM Do YYYY, h:mm:ss a');
  MessageCollection.findOne({
    _id: req.params.chatId
  }, (err, chatroom) => {
    if(!chatroom){
      return res.send('This chatroom does not exist.');
    }else{
      res.render('index', {time: time, pastmessages: chatroom.messagesArray});
    }
    if(err){
      return res.send('Invalid');
    }
  });
});

router.get('/admin/chatroomadmin/adminchat', requireLogin, (req, res) => {
  var chatroomsArr = [];
  MessageCollection.find({
    type: "init"
  }).cursor()
  .on('data', (doc) => {
    chatroomsArr.push(doc);
    res.render('adminchat',{chatsopen: chatroomsArr});
  })
  .on('error', (err) => {
    return res.render('adminchat',{message:'No chats open at this time.'});
  });

});

router.get('/admin/chatroomadmin/adminchat/:chatId', requireLogin, (req, res) => {
  var time = moment().format('MMMM Do YYYY, h:mm:ss a');
  var chatId = req.params.chatId;
  MessageCollection.findOne({
    _id: chatId
  }, (err, chatroom) => {
    if(!chatroom){
      return res.send('This chatroom does not exist!');
    }else{
      var pastmessages = chatroom.messagesArray;
      res.render('adminchatview', {pastmessages});
    }
    if(err){
      return res.send('Invalid');
    }
  });
});

router.get('/admin/chatroomadmin/login', (req, res) => {
  res.render('adminlogin');
});
router.get('/logout', (req,res) => {
  req.session.reset();
  res.redirect('/');
});
router.post('/admin/chatroomadmin/login', (req, res) => {
  User.findOne({
    email:req.body.email
  },(err, user) => {
    console.log(req.body.email);
    if(!user){
      res.render('adminlogin', {
        error: "Invalid"});
    }else{
      if(bcrypt.compareSync(req.body.password, user.password)){
        console.log('matched');
        req.session.user = user;
        res.redirect('adminchat');
      }else{
        var error = "Incorrect password or email";
        res.render('adminlogin',{error});
      }
    }
    if(err){
      var error = "No such user exists.";
      res.render('adminlogin', {error});
    }
  });
});
module.exports = router;
