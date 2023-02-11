import express, { Express, Request, Response } from 'express';
import http from 'http';
import socketio from 'socket.io';
import Filter from 'bad-words';
import { generateMessage, generateLocationMessage } from './utils/messages';
import { addUser, removeUser, getUser, getUsersInRoom, deleteRoom, roomPasswordGenerator } from './utils/users';

const app: Express = express();
const server = http.createServer(app)
const io = socketio(server)
const port = 4000;

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    const filter = new Filter()

    socket.on("join", ({ username, room }, callback) => {
        if (filter.isProfane(username) || filter.isProfane(room)) {
            return callback('Profanity is not allowed!')
        }
        const { error, user, rooms } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        io.to(user.room).emit('message', generateMessage('Use this code to rejoin the room: ' + roomPasswordGenerator()))
        socket.broadcast.to(user.room).emit('message', generateMessage("Admin", `${user.username} has joined!`))
        io.to(user.room).emit("roomData", {
            room: user.room,
            rooms,
            users: getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })

            // deleteRoom(user)
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});