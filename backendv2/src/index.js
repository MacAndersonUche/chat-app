
const express = require('express')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom, deleteRoom, roomPasswordGenerator } = require('./utils/users')

const app = express()
const http = require('http').Server(app);
const cors = require('cors');
const port = 4400
app.use(cors());
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});





io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', (data) => {
        io.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});
http.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})