var roomList = document.getElementsByClassName('room__list')[0];

var socket = io();

socket.on('connect', function () {

  socket.emit('getRoomList');

  socket.on('roomList', function (data) {
    var html = '';
    data.forEach(function (value) {
      var template = document.getElementById('room__list__item').innerHTML;
      html += Mustache.render(template, {
        room: value
      });
    });
    roomList.innerHTML = html;
  });

});

socket.on('disconnect', function () {
  console.log('Disconnect from server');
});
