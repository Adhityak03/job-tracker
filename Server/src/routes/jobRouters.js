const express=require("express")
const {createJob,getJob,updateJob,deleteJob,jobStat}=require("../controllers/jobController")
const verifyToken=require("../middleware/middleware")

const router=express.Router()

router.post("/",verifyToken,createJob)
router.get("/",verifyToken,getJob)
router.get("/stats",verifyToken,jobStat)
router.put("/:id",verifyToken,updateJob)
router.delete("/:id",verifyToken,deleteJob)


module.exports=router