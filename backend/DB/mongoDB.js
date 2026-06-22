import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    try {
        if (!process.env.MONGO_DB_URI) {
            throw new Error("MONGO_DB_URI is not configured");
        }
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export const getMongoHealth = async () => {
    const state = mongoose.connection.readyState;
    const stateLabel = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
    }[state] || "unknown";

    if (state !== 1 || !mongoose.connection.db) {
        return {
            status: "down",
            state: stateLabel,
            ping: false,
        };
    }

    try {
        await mongoose.connection.db.admin().ping();
        return {
            status: "ok",
            state: stateLabel,
            ping: true,
        };
    } catch (error) {
        return {
            status: "down",
            state: stateLabel,
            ping: false,
            error: error.message,
        };
    }
}

export default connectToMongoDB;
