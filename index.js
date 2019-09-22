var express = require('express');
var socket = require("socket.io");
//Setup
var app = express();

var server = app.listen(4000, () => {
    console.log("listening to requests on port 4000");
})

//Static files
app.use(express.static('public'));

// Socket setup (want socket.io to work with server declared above)
var io = socket(server);

//listens for a connection event (when client connects)
io.on('connect', (socket) => {
    console.log("made socket connection", socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit("chat", data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});