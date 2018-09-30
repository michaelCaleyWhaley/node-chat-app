var form = document.getElementById('message-form');
var input = document.getElementsByTagName('input').message;
var messages = document.getElementById('messages');
var locationButton = document.getElementById('send-location');

var socket = io();

function scrollToBottom() {
    var newMessage = messages.querySelector('li:last-child');

    var clientHeight = messages.clientHeight;
    var scrollTop = messages.scrollTop;
    var scrollHeight = messages.scrollHeight;
    var newMessageHeight = newMessage.offsetHeight;

    var lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.offsetHeight : 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}

socket.on('connect', function () {
    
    var params = window.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });




});

// prints message to screen
socket.on('newMessage', function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('HH:mm');
    var template = document.getElementById('message-template').innerHTML;
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    });
    messages.innerHTML += html;
    scrollToBottom();
});

socket.on('newLocationMessage', function (locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('HH:mm');
    var template = document.getElementById('location-message-template').innerHTML;
    var html = Mustache.render(template, {
        from: locationMessage.from,
        createdAt: formattedTime,
        url: locationMessage.url
    });
    messages.innerHTML += html;
    // // re-enabled location button
    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send location';
    scrollToBottom();
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

// submits message to server
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === '') { return false; }

    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function (data) {
        input.value = '';
    });
});

// location button
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    // disabling location button during sending
    locationButton.setAttribute('disabled', 'disabled');
    locationButton.textContent = 'Sending location...';

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function () {
        alert('Unable to fetch location.');
        // re-enabled location button
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send location';
    });
});