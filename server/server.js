const express = require('express');
const http = require('http');

const socketIO = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Greet a new user and notify others about him
  socket.emit('newMessage', generateMessage('Admin', 'Welcome Comrade!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User here'));

  // io.emit broadcasts the event to all the connections
  // second argument for the callback is an acknowledgement
  socket.on('createMessage', (message, callback) => {
    // We recieved a message from the user 
    // Now broadcast the message to all the users
    io.emit('newMessage', generateMessage (message.from, message.text));
    callback('Server: your data was acknowledged');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
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



// socket.emit emits an event to a single connection
// first argument is the name of the event we want to emit
// the listener's name on client side should match this name
// Second argument is the data we wanna pass
// socket.emit('newMessage', {
//   text: 'Hasta la Vista, Baby'
// });



// // Broadcasting events: sending message to everyone except some
// // Here we will broadcast the newMessage to everyone except the
// // person who sent it
// socket.broadcast.emit('newMessage', {
//   from: message.from,
//   text: message.text,
//   createdAt: new Date().getTime()
// });
