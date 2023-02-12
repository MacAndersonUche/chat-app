
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


let users = [];



io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    const filter = new Filter()
    //sends the message to all the users on the server
    socket.on('message', (data) => {
        io.emit('messageResponse', data);
    });
    socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        socket.disconnect();
    });
});
http.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})