import { v4 as uuidv4 } from 'uuid';

interface User { id: string; username: string; room: string; }

const users: User[] = []
const rooms: string[] = []
let roomPassword;

const addUser = ({ id, username, room }: User) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: "Username and room are required!"
        }
    }

    const existingUser = users.find(user => user.room === room && user.username === username)

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


const removeUser = (id: string) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0]
        return deletedUser;

    }
}
const getUser = (id: string) => {
    const user = users.find(user => user.id === id)
    if (user) {
        return user
    }

    return {
        error: "User not found"
    }
}
const getUsersInRoom = (room: string) => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
}

const getAllRooms = () => {

    return rooms
}


const deleteRoom = (user: User) => {
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




export {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getAllRooms,
    deleteRoom,
    roomPasswordGenerator
}