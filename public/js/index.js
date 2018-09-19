var form = document.getElementById('message-form');
var input = document.getElementsByTagName('input').message;
var message = document.getElementById('messages');
var locationButton = document.getElementById('send-location');
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

// prints message to screen
socket.on('newMessage', function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('HH:mm');
    var li = document.createElement('li');
    li.textContent = newMessage.from + ' ' + formattedTime + ': ' + newMessage.text;
    message.appendChild(li);
});

socket.on('newLocationMessage', function (locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('HH:mm');
    var li = document.createElement('li');
    li.textContent = locationMessage.from + ' ' + formattedTime + ': ';
    var a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', locationMessage.url);
    a.textContent = 'My current location';
    li.appendChild(a);
    message.appendChild(li);
    // re-enabled location button
    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send location';
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

// submits message to server
form.addEventListener('submit', function (e) {
    e.preventDefault();

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