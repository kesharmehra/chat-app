const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;



const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected...'); 

    socket.emit('welcomeMessage', {
        from:'Admin',
        text:'Welcome to the Chat',
        createdAt: new Date().toDateString()
    });

    socket.broadcast.emit('newUserJoined', {
        from:'Admin',
        text: 'A new user has joined the chat',
        createdAt: new Date().toDateString()
    });


    socket.on('createMessage', (message) => {
        console.log("createMessage",message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toDateString()
        // })
    })

socket.on('disconnect', () => {
    console.log('user disconnected...');
});

});



server.listen(port,() => {
    console.log("server started on localhost at port 3000");
});
