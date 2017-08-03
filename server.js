const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const sessions = require('client-sessions');
const hbs = require('hbs');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const User = require('./models/user');
// const csrf = require('csurf');


mongoose.connect('mongodb://localhost:/helpline');

var port = process.env.PORT || 8000;

const publicPath = path.join(__dirname, '/public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use('/public/', express.static(publicPath));

const routes = require('./routes/index');



app.use(bodyParser.urlencoded({extended: true}));




hbs.registerPartials(__dirname+'/views/partials');
// app.use(express.static(__dirname + '/public'));



io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });
  socket.on('sendMessage', (message) => {
    console.log('Message sent:', message.message);
  });

});


//cookieName
app.use(sessions({
  cookieName: 'session',
  secret: 'salt',
  duration:30*60*1000,
  activeDuration: 5*60*1000,
  httpOnly: true,
  secure:true
}));
//session authentication middleware
app.use((req, res, next) => {
  if (req.session && req.session.user){
    User.findOne({
      email:req.session.user.email
    }, (err, user) => {
      if(user){
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
      }
      next();
    });
  }else{
    next();
  }
});

// app.use(csrf());
app.set('view engine', 'hbs');
app.use('/',routes);

server.listen(port, () => {
  console.log('Port is up and running in', port);
});
