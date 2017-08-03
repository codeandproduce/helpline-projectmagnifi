var socket = io(); //initiating the request & storing

socket.on('connect', function(){
  console.log("connected to server");
});

// <div class="message-footer">
//     <form class="message-form">
//       <input name="message" type="text" placeholder="Message"/>
//       <button class="submitButton">Send</button>
//     </form>
// </div>

$('.message-form').on('submit', function(e){
  e.preventDefault();
  if($('[name="message"]').val() !== ''){
    socket.emit('sendMessage', {
      message: $('[name=message]').val()
    }, function(){
    });
    $('.contain-message-list').append(`<li class='user message'>\
      <div class='one-message'>\
        <img class='icon' src='/public/common.png'/>\
        <p class='message-content'>${$('[name=message]').val()}</p>\
      </div>\
    </li>`);
    $('[name="message"]').val('');
  }
});



//
// <li class="admin message">
//   <div class="one-message">
//     <img class="icon" src="/public/sampleMich.png"/>
//     <p class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//   </div>
// </li>
// <li class="user message">
//   <div class="one-message">
//     <img class="icon" src="/public/common.png"/>
//     <p class="message-content">This is from the user.</p>
//   </div>
// </li>
