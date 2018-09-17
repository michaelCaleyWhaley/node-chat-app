var form = document.getElementById('message-form');
var input = document.getElementsByTagName('input').message;
var message = document.getElementById('messages');
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (newMessage) {
    console.log(newMessage);
    var li = document.createElement('li');
    li.textContent = newMessage.from + ': ' + newMessage.text;
    message.appendChild(li);
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

form.addEventListener('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function(data){
        console.log(data);
    });
});