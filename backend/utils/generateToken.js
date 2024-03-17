import jwt from 'jsonwebtoken';


const genrateTokenAndsetCookies = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 *60*60*1000, // milli second for expire
        httpOnly:true,// prevent from cross-site scripting attack
        sameSite:"strict",//csrf
        secure:process.env.NODE_ENV !== "development"
    })
}

export default genrateTokenAndsetCookies;