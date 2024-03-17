import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connect to MongoDB ")
    } catch (error) {
        console.log("Error to connect mongodb")
    }
}

export default connectToMongoDB;