const express = require('express');
const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcryptjs');
// const csrf = require('csurf');

const User = require('./../models/user');
const Message = require('./../models/message');

const ObjectId = require('mongoose').Schema.ObjectId;

function requireLogin(req,res,next){
  if(!req.user){
    res.redirect('/admin/chatroomadmin/login');
  }else{
    next();
  }
}

var attempts = 0;

var time = moment().format('MMMM Do YYYY, h:mm:ss a');
router.get('/', (req, res) => {
  res.render('startchat', {
    currentTime: time
  });
  attempts++;
});
router.post('/', (req, res) => {
  var name = '';
  if(!req.body.name){
    name = 'Anonymous';
  }else{
    name = req.body.name;
  }
  var init = new Message({
    chatId: bcrypt.hashSync(`ObjectId`, bcrypt.genSaltSync(10)),
    fromname: name,
    fromu: 'user',
    message:'init',
    type: 'init'
  });
  init.save((err) => {
    if(err){
      console.log('err');
    }else{
      res.redirect('/chatroom/'+init.chatId);
    }
  });
});
router.get('/chatroom/:chatId', (req, res) => {
  var chatId = req.params.chatId;
  res.render('index', {chatId});
});

router.get('/admin/chatroomadmin/adminchat', requireLogin, (req, res) => {
  res.render('adminchat');
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
