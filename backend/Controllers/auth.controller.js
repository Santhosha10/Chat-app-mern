import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { sendError, sendServerError } from '../utils/apiResponse.js';
import { emailPattern, normalizeEmail, normalizeText, normalizeUsername, usernamePattern } from '../utils/validation.js';
import { getAvatarPath } from '../utils/avatar.js';

const serializeUser = (user) => ({
    _id:user._id,
    fullName:user.fullName,
    username:user.username,
    email:user.email,
    profilePic:user.profilePic || getAvatarPath(user.username || user.fullName)
});

export const signup = async(req,res)=>{
    try{
        const fullName = normalizeText(req.body.fullName);
        const username = normalizeUsername(req.body.username);
        const email = normalizeEmail(req.body.email);
        const password = normalizeText(req.body.password);
        const confirmPassword = normalizeText(req.body.confirmPassword);
        const gender = normalizeText(req.body.gender);

        if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return sendError(res, 400, "All fields are required")
        }

        if (!usernamePattern.test(username)) {
            return sendError(res, 400, "Username must be 3-24 characters and only use lowercase letters, numbers, or underscores")
        }

        if (!emailPattern.test(email)) {
            return sendError(res, 400, "Please enter a valid email address")
        }

        if (password.length < 6) {
            return sendError(res, 400, "Password must be at least 6 characters")
        }

        if(password !== confirmPassword){
            return sendError(res, 400, "Passwords don't match")
        }

        if (!["male", "female"].includes(gender)) {
            return sendError(res, 400, "Please select a valid gender")
        }

        const user= await User.findOne({$or:[{username},{email}]});
        if(user){
            return sendError(res, 409, user.username === username ? "Username already exists" : "Email already exists")
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword,
            gender,
            profilePic: getAvatarPath(username)
        })

        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json(serializeUser(newUser))

    }catch(error){
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern || {})[0];
            return sendError(res, 409, field === "email" ? "Email already exists" : "Username already exists")
        }
        return sendServerError(res, "signup", error)
    }
}

export const login = async(req,res)=>{
  try {
    const identifier = normalizeText(req.body.identifier || req.body.username).toLowerCase();
    const password = normalizeText(req.body.password);

    if (!identifier || !password) {
        return sendError(res, 400, "Username or email and password are required")
    }

    const user = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    });
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if (!user || !isPasswordCorrect) {
        return sendError(res, 401, "Invalid username/email or password")
    }

    generateTokenAndSetCookie(user._id,res);
    res.status(200).json(serializeUser(user))

  } catch (error) {
    return sendServerError(res, "login", error)
  }
}

export const getMe = (req,res)=>{
   try {
    res.status(200).json(serializeUser(req.user))
   } catch (error) {
    return sendServerError(res, "getMe", error)
   }
}

export const logout = (req,res)=>{
   try {
    res.clearCookie("jwt",{
        httpOnly:true,
        sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
        secure:process.env.NODE_ENV === "production"
    });
    res.status(200).json({message:"Logged out successfully"})
   } catch (error) {
    return sendServerError(res, "logout", error)
   }
}
