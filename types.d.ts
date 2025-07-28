import { Connection } from "mongoose";


//mongo db can either be connected or not or in the process of connecting i.e. promise

declare global {
    var mongoose: {
        promise: Promise<Connection> | null;
        conn: Connection | null;
    };
}

export {}