import { log } from "console";
import mongoose from "mongoose";

export function connectToMongoDB () {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    const uri = process.env.DB_URI as string;

    mongoose.set("strictQuery", false);
    mongoose.connect(uri);
}