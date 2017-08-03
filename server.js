const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const hbs = require('hbs');


var port = process.env.PORT || 8000;

const publicPath = path.join(__dirname, '/public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use('/public', express.static(publicPath));

const routes = require('./routes/index');



app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'hbs');
app.use('/',routes);
hbs.registerPartials(__dirname+'/views/partials');
// app.use(express.static(__dirname + '/public'));



io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });

});


server.listen(port, () => {
  console.log('Port is up and running in', port);
});
