const express = require('express');
const http = require('http');

const socketIO = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

app.get('/', (req, res) => {

});

server.listen(port, process.env.IP, () => {
  console.log(`Server up and running on port ${port}`);
});
