import { Passed } from "..";

interface User { id: string; username: string; room: string; }

interface RoomData {
    room?: string;
    rooms?: string[];
    users: User[]
}
interface ServerToClientEvents {
    message: (a: { username: string | undefined; text: string | undefined; createdAt: number; }) => void;
    locationMessage: (a: { username: string; url: string; createdAt: number; }) => void;
    roomData: ({ room, rooms, users }: RoomData) => void
}

interface ClientToServerEvents {
    join: ({ username, room }: Passed, callback: (text?: string) => string) => void;
    sendMessage: (message: string, callback: (text?: string) => string) => void;
    sendLocation: (coords: { longitude: string, latitude: string }, callback: (text?: string) => string) => void;
}


export {
    User,
    ClientToServerEvents,
    ServerToClientEvents
}