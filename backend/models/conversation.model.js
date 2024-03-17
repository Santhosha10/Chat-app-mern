import mongoose from "mongoose";

const ConverstionSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]
},{timestamps:true})

const Converstion =mongoose.model("Conversation",ConverstionSchema);

export default Converstion