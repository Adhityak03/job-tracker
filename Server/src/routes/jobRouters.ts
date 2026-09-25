import express from "express";
import { createJob, getJob, updateJob, deleteJob, jobStat } from "../controllers/jobController";
import verifyToken from "../middleware/middleware";

const router = express.Router();

router.post("/",verifyToken,createJob)
router.get("/",verifyToken,getJob)
router.get("/stats",verifyToken,jobStat)
router.put("/:id",verifyToken,updateJob)
router.delete("/:id",verifyToken,deleteJob)


export default router;