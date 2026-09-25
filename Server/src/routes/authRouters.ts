import express from "express";
import { register, login } from "../controllers/authController";
import  verifyToken  from "../middleware/middleware";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)

router.get("/me",verifyToken,(req,res)=>{
    res.status(200).json(req.user)
})

export default router