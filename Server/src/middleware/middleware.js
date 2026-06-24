const jwt=require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    try{
        const authheader=req.headers.authorization

        if(!authheader){
            return res.status(401).json({
                message:"Didnt get the token"
            })       }

        const token=authheader.split(" ")[1];
        const decode=jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user=decode;
        next()
    }catch(error){
        res.status(401).json({
            message:"Invalid Tokens"
        })
    }
}

module.exports=verifyToken