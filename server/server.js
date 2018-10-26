const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {
  generateMessage,
  generateLocationMessage
} = require("./utils/message.js");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users.js");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", socket => {
  // console.log('New user connected');

  // INDEX PAGE
  socket.on("getRoomList", () => {
    socket.emit("roomList", users.getRoomList());
  });

  // CHAT PAGE
  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required");
    }
    // saves original room name, to alias, uses lowercase for all rooms
    params.alias = params.room;
    params.room = params.room.toLowerCase();
    // join room
    socket.join(params.room);
    // user is removed from any previous rooms
    users.removeUser(socket.id);
    // user is added to new room
    users.addUser(socket.id, params.name, params.room, params.alias);
    if (users.checkForDuplicateUser(params.name, params.room)) {
      callback("Users must have different names.");
    }
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app.")
    );
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined.`)
      );
    // if no error callback is called without arguement. Arguement singals problem
    callback();
  });

  socket.on("createMessage", (createdMessage, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(createdMessage.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, createdMessage.text)
      );
    }
    callback("This is from the server.");
  });

  socket.on("createLocationMessage", coords => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left.`)
      );
    }
  });

  socket.on("newNudgeRequest", () => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('nudgeRoom', user.name);
    io.to(user.room).emit('newMessage', {
      from: user.name,
      text: 'Nudged the room.'
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
