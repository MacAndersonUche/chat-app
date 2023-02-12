const { v4: uuidv4 } = require('uuid');

const users = []
const rooms = []
let roomPassword;

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: "Username and room are required!"
        }
    }

    const existingUser = users.find(user => user.room === room && user.username === username)
    console.log(users);

    if (existingUser) {
        return {
            error: "Username is in use"
        }
    }
    const user = { id, username, room }
    users.push(user)

    !rooms.includes(room) ? rooms.push(room) : rooms
    return { user, rooms }
}


const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0]
        return deletedUser;

    }
}
const getUser = (id) => {
    const user = users.find(user => user.id === id)
    if (user) {
        return user
    }

    return {
        error: "User not found"
    }
}
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
}

const getAllRooms = () => {

    return rooms
}


const deleteRoom = (user) => {
    users.forEach(origin => {
        if (origin.room !== user.room) {
            const roomIndex = rooms.indexOf(user.room)
            rooms.splice(roomIndex, 1)
        }
    })
}


const roomPasswordGenerator = () => {
    return uuidv4().slice(0, 7).toUpperCase()
}




module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getAllRooms,
    deleteRoom,
    roomPasswordGenerator
}