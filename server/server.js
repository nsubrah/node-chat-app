const path = require('path');
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');

const publicPath=path.join(__dirname,"../client");
const port=process.env.PORT || 3000;

const app = express();
var server= http.createServer(app);
var io = socketIO(server);
io.on('connection',(socket) => {
  console.log("New user connected");

  socket.on('disconnect',() => {
    console.log('User was Disconnected');
  })
})

app.use(express.static(publicPath));
server.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
});
