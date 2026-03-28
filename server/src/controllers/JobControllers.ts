import { Request, Response } from 'express'
import  {AuthRequest}  from '../types/types'
import { Job } from '../models/Job'
import { SavedJobs } from '../models/SavedJobs'


export const createJob = async (req:AuthRequest, res:Response)=>{
  try {
    
    if(req.user?.role !== 'employer'){
      return res.status(403).json({message:'Only employers can create jobs'})
    }
    
    const job =new Job({
      employer_id:req.user!.userId,
      ...req.body
    })
    await job.save()
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


export const getJobs = async(req:Request, res:Response)=>{
  try {
    const {page=1, limit=10, skills, location, remote,salary_min,status='open'} = req.query;
    const query:any = {status};

    if (skills) query.skills = { $in: (skills as string).split(',') };
    if(location) query.location = {$regex:location,$options:'i'};
    if(remote==='true') query.remote = true;
    if(salary_min) query.salary_min = {$gte:Number(salary_min)};

    const jobs = await Job.find(query)
      .populate('employer_id', 'name')
      .populate('skills','name')
      .limit(+(limit))
      .skip((+page - 1) * (+limit))
      .sort({ createdAt: -1 });

      const total = await Job.countDocuments(query);
     res.json({
      jobs,
      pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const getJobById = async (req:Request, res:Response)=>{
  try {
    const {id}= req.params
    const job = await Job.findById(id).populate('employer_id', 'name')
    .populate('skills','name')
    ;
    if(!job){
      return res.status(404).json({message:'Job not found'})
    }
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const updatejob = async (req:AuthRequest,res:Response)=>{
  try {
    if(req.user!.role !== 'employer'){
      return res.status(403).json({message:'Only employers can update jobs'})
    }
    const {id} = req.params;
    const job = await Job.findById(id);
    if(!job){
      return res.status(404).json({message:'Job not found'})
    }

    if(!job.employer_id.equals(req.user!.userId)){
      return res.status(403).json({message:'You can only update your own jobs'})
    }

    const updated = await Job.findByIdAndUpdate(id,req.body,{new:true}).populate('skills','name')
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const deleteJob = async (req:AuthRequest, res:Response)=>{
  try {
    if(req.user!.role !== 'employer'){
      return res.status(403).json({
        message:'Only employers can delete jobs'
      })
    }

    const {id}= req.params;
    
    const job = await Job.findOneAndDelete({_id:id, employer_id:req.user!.userId})
    if(!job){
      return res.status(404).json({message:'Job not found'})
    }
    res.status(200).json({message:'Job deleted successfully'})
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const closeJob = async (req:AuthRequest, res:Response)=>{
  try {
    if(req.user!.role!=='employer'){
      return res.status(403).json({message:'Only employers can close jobs'})
    }
    const {id}= req.params;
    const job = await Job.findOneAndUpdate({_id:id, employer_id:req.user!.userId}, {status:'closed'}, {new:true})
    if(!job){
      return res.status(404).json({message:'Job not found'})
    }
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const getSavedJobs = async (req:AuthRequest, res:Response)=>{
  try {
    console.log("Req come");
    
    if(req.user!.role!=='seeker'){
      return res.status(403).json({message:'Only job seekers can get saved jobs'})
    }
    const userId = req.user!.userId;
    const jobs = await SavedJobs.find({user_id:userId})
    .populate('job_id','title description salary_max location remote skills status ').lean();
    return res.status(200).json(jobs)
  } catch(error){
    res.status(500).json({ error: 'get saved jobs error' });
  }
}


export const toggleSaveJob = async (req: AuthRequest, res: Response) => {
  try {
    if(req.user!.role!=='seeker'){
      return res.status(403).json({message:'Only job seekers can save jobs'})
    }
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if(!job){
      return res.status(404).json({message:"Job not found"})
    }
    const existing = await SavedJobs.findOne({ job_id: jobId, user_id: req.user?.userId });
    if(existing){
      await SavedJobs.deleteOne({job_id:jobId,user_id:req.user?.userId});
      return res.status(200).json({ message: "Job unsaved successfully" });
    }else{
      const savedJob = new SavedJobs({
        job_id: jobId,
        user_id: req.user?.userId,
      });
      await savedJob.save();

      return res.status(201).json({message:"Job saved successfully"})
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};