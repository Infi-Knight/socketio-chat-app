const express = require('express');
const http = require('http');

const socketIO = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // io.emit broadcasts the event to all the connections
  // second argument for the callback is an acknowledgement
  socket.on('createMessage', (message, callback) => {
    // We recieved a message from the user 
    // Now broadcast the message to all the users
    io.emit('newMessage', generateMessage (message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      // prevent the further execution in case of validation error
      return callback('Name and room are both required');
    }

    socket.join(params.room);
    // remove the user from existing rooms and then join him to a room
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'How you doin?'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
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
