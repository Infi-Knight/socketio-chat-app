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

  // socket.emit emits an event to a single connection
  // first argument is the name of the event we want to emit
  // the listener's name on client side should match this name
  // Second argument is the data we wanna pass
  // socket.emit('newMessage', {
  //   text: 'Hasta la Vista, Baby'
  // });

  // io.emit broadcasts the event to all the connections
  socket.on('createMessage', (message) => {
    console.log('User: ', message);
    // We recieved a message from the user 
    // Now broadcast the message to all the users
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});





app.get('/', (req, res) => {

});

app.get('/test', (req, res) => {
  res.send('Hii');
});

server.listen(port, process.env.IP, () => {
  console.log(`Server up and running on port ${port}`);
});
