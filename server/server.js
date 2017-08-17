const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;



const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {


    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'));


    socket.on('createMessage', (message, callback) => {
        if (message.text.trim().length > 0) {
        console.log("createMessage",message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        }
        callback();
        
    });

    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', 
        generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

socket.on('disconnect', () => {
    console.log('user disconnected...');
});

});



server.listen(port,() => {
    console.log("server started on localhost at port 3000");
});
