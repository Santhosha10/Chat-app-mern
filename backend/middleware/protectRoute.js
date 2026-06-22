import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendError, sendServerError } from '../utils/apiResponse.js';

const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return sendError(res, 401, "Authentication required")
        }

        const decoded =jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return sendError(res, 401, "Invalid authentication token")
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return sendError(res, 401, "User not found")
        }

        req.user = user;

        next();

    }catch(error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return sendError(res, 401, "Session expired. Please log in again")
        }
        return sendServerError(res, "protectRoute", error)
    };
}

export default protectRoute;
