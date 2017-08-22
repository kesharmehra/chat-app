const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;



const app = express();

var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {


    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required...');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        console.log('users',JSON.stringify(users,null,2));
        
        socket.broadcast.to(params.room).emit('newMessage', 
                generateMessage('Admin',`${params.name} has Joined`));
        

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        if (message.text.trim().length > 0) {
        console.log("createMessage",message);
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));            
        }

        }
        callback();
        
    });

    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        var user = users.getUser(socket.id);
        if(user) {
        io.to(user.room).emit('newLocationMessage', 
        generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

socket.on('disconnect', () => {
    console.log('user disconnected...');
    var user = users.removeUser(socket.id);

    if(user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left!!!`));
    }
});

});



server.listen(port,() => {
    console.log("server started on localhost at port 3000");
});
