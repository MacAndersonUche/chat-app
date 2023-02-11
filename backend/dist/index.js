"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const bad_words_1 = __importDefault(require("bad-words"));
const cors_1 = __importDefault(require("cors"));
const messages_1 = require("./utils/messages");
const users_1 = require("./utils/users");
const app = (0, express_1.default)();
const newHttp = require('http').Server(app);
app.use((0, cors_1.default)());
const io = new socket_io_1.Server(newHttp, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const port = 4500;
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    const filter = new bad_words_1.default();
    socket.on("join", ({ username, room }, callback) => {
        if (filter.isProfane(username) || filter.isProfane(room)) {
            return callback('Profanity is not allowed!');
        }
        const { error, user, rooms } = (0, users_1.addUser)({ id: socket.id, username, room });
        if (error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('message', (0, messages_1.generateMessage)('Welcome!'));
        io.to(user.room).emit('message', (0, messages_1.generateMessage)('Use this code to rejoin the room: ' + (0, users_1.roomPasswordGenerator)()));
        socket.broadcast.to(user.room).emit('message', (0, messages_1.generateMessage)("Admin", `${user.username} has joined!`));
        io.to(user.room).emit("roomData", {
            room: user === null || user === void 0 ? void 0 : user.room,
            rooms,
            users: (0, users_1.getUsersInRoom)(user.room)
        });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = (0, users_1.getUser)(socket.id);
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }
        if ("room" in user) {
            io.to(user.room).emit('message', (0, messages_1.generateMessage)(user.username, message));
            callback();
        }
    });
    socket.on('sendLocation', (coords, callback) => {
        const user = (0, users_1.getUser)(socket.id);
        if ("room" in user) {
            io.to(user.room).emit('locationMessage', (0, messages_1.generateLocationMessage)(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
            callback();
        }
    });
    socket.on('disconnect', () => {
        const user = (0, users_1.removeUser)(socket.id);
        if (user) {
            io.to(user === null || user === void 0 ? void 0 : user.room).emit('message', (0, messages_1.generateMessage)('Admin', `${user.username} has left!`));
            io.to(user === null || user === void 0 ? void 0 : user.room).emit('roomData', {
                room: user === null || user === void 0 ? void 0 : user.room,
                users: (0, users_1.getUsersInRoom)(user === null || user === void 0 ? void 0 : user.room)
            });
            // deleteRoom(user)
        }
    });
});
newHttp.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
