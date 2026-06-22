import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        maxlength:80
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:3,
        maxlength:24,
        match:/^[a-z0-9_]+$/
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        maxlength:254,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });

const User = mongoose.model("User",userSchema);

export default User;
