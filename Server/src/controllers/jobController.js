const job = require("../models/job");
const Job=require("../models/job")

const createJob = async(req,res,next)=>{
    try {
        const{title,company,status,appliedData,notes}=req.body
        
        if(!company&&!title){
            return res.status(400).json({
                message:"Title and company name is required"
            })
        }
        const validStatus=["Applied", "Interview", "Offer", "Rejected"]
        if(status&&!validStatus.includes(status)){
            res.status(400).json({
                message:"invalid job status"
            })
        }
        const job=await Job.create({
            title,
            company,
            status,
            appliedData,
            notes,
            userId:req.user.id
        })
        res.status(201).json(job)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getJob=async(req,res,next)=>{
    try{
        const jobs= await Job.find({
            userId:req.user.id
        })
        res.status(200).json(jobs)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const updateJob=async(req,res,next)=>{
    try{
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json(updatedJob)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteJob =async(req,res,next)=>{
    try{
        const deletedJob=await Job.findByIdAndDelete(
            req.params.id
        )
         res.status(200).json({
      message: "Job deleted successfully",
        })
    }catch (error) {
    res.status(500).json({
      message: error.message,
    })
}
}

const jobStat= async(req,res,next)=>{
    try{
        const jobs=await Job.find({
            userId:req.user.id
        })

        const stats = {
            Applied: 0,
            Interview: 0,
            Offer: 0,
            Rejected: 0,
        };
        jobs.forEach((item)=>{
            stats[item.status]++
        })
        res.status(200).json(stats)
    }catch(error){
        res.status(500).json({
            messahe:error.message
        })
    }
}
module.exports={createJob,updateJob,deleteJob,getJob,jobStat}