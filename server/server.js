const path = require('path');
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message.js')

const publicPath=path.join(__dirname,"../client");
const port=process.env.PORT || 3000;

const app = express();
var server= http.createServer(app);
var io = socketIO(server);
io.on('connection',(socket) => {
  console.log("New user connected");

  // socket.emit('newEmail',{
  //   from:"abc@example.com",
  //   test:"Hi How are you",
  //   createAt:123
  //
  // });
  // socket.on('createEmail',(newEmail) => {
  //   console.log('createEmail ',newEmail);
  // });
socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joinied'));

  socket.on('createMessage',(message) =>{
    console.log('Create Message ',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',() => {
    console.log('User was Disconnected');
  });
});

app.use(express.static(publicPath));
server.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
});
