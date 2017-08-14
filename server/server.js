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

    socket.emit('newMessage',{
        from:'iamtheserver@inthisworld.com',
        text: 'this is my message',
        createdAt: new Date().toTimeString()
    });

    // socket.emit('newEmail', {
    //     "from":"keshar.mehra@gmail.com",
    //     "text":"Hey, what is going on"
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('create email', newEmail);
    // })

    socket.on('createMessage', (message) => {
        console.log("aah... this person seems to reply my calls",message);
    })

socket.on('disconnect', () => {
    console.log('user disconnected...');
});

});



server.listen(port,() => {
    console.log("server started on localhost at port 3000");
});
