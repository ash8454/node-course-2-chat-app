const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  // socket.emit('newEmail', {
  //   from: 'ashok@example.com',
  //   text: 'Hey. what is going on',
  //   createAt: 123
  // });

  socket.emit('newMessage', {
    from: 'ashok@example.com',
    text: 'Hey. This is ashok',
    createdAt: 123
  });

  socket.on('createMessage', (newMessage) => {
    console.log("createMessage", newMessage);
  });


  // 
  // socket.on('createEmail', (newEmail) => {
  //   console.log("createEmail", newEmail);
  // });
  //

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
