import User from "../models/user.model.js"
import { sendServerError } from "../utils/apiResponse.js";

export const getUserforSiderbar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}})
            .select("-password")
            .sort({ fullName: 1 });

        res.status(200).json(filteredUsers);

    } catch (error) {
        return sendServerError(res, "getUserforSiderbar", error)
    }
}
