var socket = io(); //initiating the request & storing

socket.on('connect', function(){
  console.log("connected to server");
});
