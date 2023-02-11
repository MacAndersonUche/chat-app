import { Passed } from "..";

interface User { id: string; username: string; room: string; }

interface RoomData {
    room: string;
    rooms: string[];
    users: User[]
}
interface ServerToClientEvents {
    message: (a: string) => void;
    locationMessage: (a: string) => void;
    roomData: (a: string, { room, rooms, users }: RoomData) => void
}

interface ClientToServerEvents {
    join: (callback: ({ username, room }: Passed, callback: (text?: string) => string) => void) => void;
    sendMessage: (callback: (message: string, callback: (text?: string) => string) => void) => void;
    sendLocation: (callback: (coords: string, callback: (text?: string) => string) => void) => void;
}


export {
    User,
    ClientToServerEvents,
    ServerToClientEvents
}