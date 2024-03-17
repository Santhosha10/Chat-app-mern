import User from "../models/user.model.js"

export const getUserforSiderbar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id

        //const allUser = await User.find() //==> to show ourself also

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in geting user")
        res.status(500).json({error:"Internal Error"})
    }
}
