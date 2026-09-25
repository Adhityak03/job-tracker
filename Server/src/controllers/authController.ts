
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";



const register=async(req: Request, res: Response,next:NextFunction)=>{
    try{
        const{name,email,password}=req.body
        
        const existinguser =await User.findOne({email})

        if(existinguser){
            return res.status(400).json({
                message:"User already exist "
            })
        }
      
      
        const hashedPassword = await bcrypt.hash(password,10)

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })
        const JWT_SECRET=process.env.JWT_SECRET;
        if(!JWT_SECRET){
            return res.status(500).json({
                message:"JWT_SECRET is not defined in the environment variables."
            })
        }

        
        const token= jwt.sign(
            {id:user._id},
            JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.status(201).json({
            message:"User sign in done",token
        })
    }
    catch (error) {
    next(error)
}

    }

    


const login= async(req: Request, res: Response, next: NextFunction)=>{

    try{
         const{email,password}=req.body

        const user=await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
const JWT_SECRET=process.env.JWT_SECRET;
        if(!JWT_SECRET){
            return res.status(500).json({
                message:"JWT_SECRET is not defined in the environment variables."
            })
        }


        const token = await jwt.sign(
            {id:user._id},
            JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.status(200).json({
            message:"Login Successful",
            token
        })
    }
    catch (error) {
    next(error)
}
   
}

export {register,login}

