const express=require("express")
const {register,login}=require("../controllers/authController")
const verifyToken=require("../middleware/middleware")

const router=express.Router()

router.post("/register",register)
router.post("/login",login)

router.get("/me",verifyToken,(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router