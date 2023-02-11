"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomPasswordGenerator = exports.deleteRoom = exports.getAllRooms = exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const uuid_1 = require("uuid");
const users = [];
const rooms = [];
let roomPassword;
const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (!username || !room) {
        return {
            error: "Username and room are required!"
        };
    }
    const existingUser = users.find(user => user.room === room && user.username === username);
    if (existingUser) {
        return {
            error: "Username is in use"
        };
    }
    const user = { id, username, room };
    users.push(user);
    !rooms.includes(room) ? rooms.push(room) : rooms;
    return { user, rooms };
};
exports.addUser = addUser;
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
    }
};
exports.removeUser = removeUser;
const getUser = (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
        return user;
    }
    return {
        error: "User not found"
    };
};
exports.getUser = getUser;
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter(user => user.room === room);
};
exports.getUsersInRoom = getUsersInRoom;
const getAllRooms = () => {
    return rooms;
};
exports.getAllRooms = getAllRooms;
const deleteRoom = (user) => {
    users.forEach(origin => {
        if (origin.room !== user.room) {
            const roomIndex = rooms.indexOf(user.room);
            rooms.splice(roomIndex, 1);
        }
    });
};
exports.deleteRoom = deleteRoom;
const roomPasswordGenerator = () => {
    return (0, uuid_1.v4)().slice(0, 7).toUpperCase();
};
exports.roomPasswordGenerator = roomPasswordGenerator;
