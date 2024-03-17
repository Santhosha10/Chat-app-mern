import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import genrateTokenAndsetCookies from '../utils/generateToken.js';


export const signup = async(req,res)=>{
    try{
        const{fullName,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.send.status(400).json({error:"Passwords don't match"})
        }

        const user= await User.findOne({username});
        if(user){
            return res.send.status(400).json({error:"UserName exist"})
        }
        // HASH PASSWORD HERE
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            genrateTokenAndsetCookies(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
        })
        }else{
            return res.send.status(400).json({error:"UserName Invaild"})
        }

    }catch(error){
        console.log("Error in Loign Controller");
        res.send(500).json({error:"Inside Server Error"})
    }
}

export const login = async(req,res)=>{
  try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if (!user || !isPasswordCorrect) {
        return res.status(404).json({error:"Invaild userName or Password"})
    }

    genrateTokenAndsetCookies(user._id,res);
    res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic
    })

  } catch (error) {
    console.log("Error in Loign Controller");
    res.send(500).json({error:"Inside Server Error"})
  }
}

export const logout = (req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"LogOut Successfully"})
   } catch (error) {
    console.log("Error in Loign Controller");
    res.send(500).json({error:"Inside Server Error"})
   }
}