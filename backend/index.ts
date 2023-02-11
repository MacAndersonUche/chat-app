import express, { Express } from 'express';
import http from 'http';
import { Server } from "socket.io";
import Filter from 'bad-words';
import cors from 'cors';
import { generateMessage, generateLocationMessage } from './utils/messages';
import { addUser, removeUser, getUser, getUsersInRoom, deleteRoom, roomPasswordGenerator } from './utils/users';
import { ClientToServerEvents, ServerToClientEvents, User } from './utils/types';

const app: Express = express();
const newHttp = require('http').Server(app);


app.use(cors());

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents
>(newHttp, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const port = 4500;

export interface Passed {
    username: string
    room: string
}


io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    const filter = new Filter()

    socket.on("join", ({ username, room }: Passed, callback: (text?: string) => string) => {
        if (filter.isProfane(username) || filter.isProfane(room)) {
            return callback('Profanity is not allowed!')
        }
        const { error, user, rooms } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user!.room)

        socket.emit('message', generateMessage('Welcome!'))
        io.to(user!.room).emit('message', generateMessage('Use this code to rejoin the room: ' + roomPasswordGenerator()))
        socket.broadcast.to(user!.room).emit('message', generateMessage("Admin", `${user!.username} has joined!`))
        io.to(user!.room).emit("roomData", {
            room: user?.room,
            rooms,
            users: getUsersInRoom(user!.room)
        })
        callback()
    })

    socket.on('sendMessage', (message: string, callback: (text?: string) => string) => {
        const user = getUser(socket.id)

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        if ("room" in user) {
            io.to(user.room).emit('message', generateMessage(user.username, message))
            callback()
        }
    })

    socket.on('sendLocation', (coords: { longitude: string, latitude: string }, callback: (text?: string) => string) => {
        const user = getUser(socket.id)

        if ("room" in user) {
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
            callback()
        }

    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user?.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user?.room).emit('roomData', {
                room: user?.room,
                users: getUsersInRoom(user?.room)
            })

            // deleteRoom(user)
        }
    })
})

newHttp.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});