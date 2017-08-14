
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

socket.on('welcomeMessage', function (message) {
    console.log('Message from server:', message);

})

socket.on('newUserJoined', function (message) {
    console.log('Message from server:', message);

})

// socket.on('newEmail',function (email) {
//     console.log('new email', email);
// })

