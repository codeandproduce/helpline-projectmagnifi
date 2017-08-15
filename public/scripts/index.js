var socket = io(); //initiating the request & storing

$(document).ready(function(){
  $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);

});
socket.on('connect', function(){
  var path = window.location.pathname.replace('/chatroom/','');
  console.log("connected to server");
  socket.emit('path', {
    path: path
  });
  socket.emit('join room', {
    route: path
  });
});
$('.message-form').on('submit', function(e){
  e.preventDefault();
  if($('[name="message"]').val() !== ''){
    socket.emit('sendMessage', {
      message:removeTags($('[name=message]').val()),
      from: 'user'
    });
    $('.contain-message-list').append(`<li class='user message'>\
       <div class='one-message'>\
         <img class='icon' src='/public/user.png'/>\
         <p class='message-content'>${removeTags($('[name=message]').val())}</p>\
         <img class="loading" src="/public/loadwheel.png"/>\
       </div>\
     </li>`);
    $('[name="message"]').val('');
    $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);

  }
});
socket.on('messageSent', function(information){
  if(information.from === 'admin'){
    $('.contain-message-list').append(`<li class='admin message'>\
       <div class='one-message'>\
         <img class='icon' src='/public/sampleMich.png'/>\
         <p class='message-content'>${removeTags(information.message)}</p>\
       </div>\
     </li>`);
     $('.main-chat').scrollTop($('.main-chat')[0].scrollHeight);
  }
  if(information.from === 'user'){
    $('.loading').css('opacity','0');
  }
});
function removeTags(string, array){
  return array ? string.split("<").filter(function(val){ return f(array, val); }).map(function(val){ return f(array, val); }).join("") : string.split("<").map(function(d){ return d.split(">").pop(); }).join("");
  function f(array, value){
    return array.map(function(d){ return value.includes(d + ">"); }).indexOf(true) != -1 ? "<" + value : value.split(">")[1];
  }
}
