

import Job from "../models/job";
import {Request, Response, NextFunction} from "express";
import{ createJob as createJobService } from "../Services/jobService";
import { title } from "process";

interface CreateJobRequest {
    title: string;
    company: string;
    position: string;
    status: "Applied" | "Interview" | "Offer" | "Rejected";
    appliedDate: string;
    notes?: string;

}
interface UpdateJobRequest {
    title: string;
    company: string;
    position: string;
    status: "Applied" | "Interview" | "Offer" | "Rejected";
    appliedDate: string;
    notes?: string;
    
}


const createJob = async (
    req: Request<{}, {}, CreateJobRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const{title,company,position,status,appliedDate,notes}=req.body
        
        
        
       const job = await createJobService(
            title,
            company,
            position,
            status,
            appliedDate,
            notes,
            req.user.id
        );
        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
}   

const getJob=async(req: Request, res: Response, next: NextFunction)=>{
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const jobs= await Job.find({
            userId:req.user.id
        })
        res.status(200).json(jobs)
    }catch(error){
        if(error instanceof Error){
        res.status(500).json({
            message:error.message
        })
    }else{
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}
}                                                                                                                                       

const updateJob=async(req: Request<{id:string}, {}, UpdateJobRequest>, res: Response, next: NextFunction )=>{
    try{
        if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
}
        const updatedJob = await Job.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },    
            req.body,
            {new:true}
        )

        res.status(200).json(updatedJob)
    }catch(error){
       next(error)
}
}

const deleteJob =async(req: Request<{id:string}>, res: Response, next: NextFunction)=>{
    try{
        if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
}
        const deletedJob=await Job.findOneAndDelete(
            { _id: req.params.id, userId: req.user.id }
        )
         res.status(200).json({
      message: "Job deleted successfully",
        })
    }catch (error) {
        next(error)
    }
}

const jobStat= async(req: Request, res: Response, next: NextFunction)=>{
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
        next(error)
}
}
export {createJob,getJob,updateJob,deleteJob,jobStat}