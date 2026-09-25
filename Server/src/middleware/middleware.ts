import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const verifyToken = (req: Request, res: Response, next: NextFunction) =>    {
    try{
        const authheader=req.headers.authorization

        if(!authheader){
            return res.status(401).json({
                message:"Didnt get the token"
            })       }
        const JWT_SECRET=process.env.JWT_SECRET;
        if(!JWT_SECRET){
            return res.status(500).json({
                message:"JWT_SECRET is not defined in the environment variables."
            })
        }
        const token=authheader.split(" ")[1];
        const decode = jwt.verify(token, JWT_SECRET);

if (typeof decode === "string" || !("id" in decode)) {
    return res.status(401).json({
        message: "Invalid token payload"
    });
}

req.user = {
    id: String(decode.id)
};
        console.log(decode);
        next()
    }catch(error){
        next(error)
    }
}

export default verifyToken;