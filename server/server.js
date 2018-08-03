
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Mike',
        text: 'new message',
        createdAt: 4
    });

    socket.on('createMessage', (createdMessage) => {
        console.log('createMessage', createdMessage);
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
