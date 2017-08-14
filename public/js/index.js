
var socket = io();

socket.on('connect', function () {
console.log('connected to server');




// socket.emit('createEmail', {
//     to: 'keshar.mehra@gmail.com',
//     text:'Hi this is andrew'
// });

});

socket.on('disconnect', function () {
    console.log('disconnected from server')
});

socket.on('newMessage', function (message) {
    socket.emit('createMessage', {
       from:'iamtheclient@clientsworld.com',
       to: message.from,
       text: `hi ${message.from}!!! in fact I was waiting for your message `        
    })
    console.log('Message from server:', message);

})

// socket.on('newEmail',function (email) {
//     console.log('new email', email);
// })

