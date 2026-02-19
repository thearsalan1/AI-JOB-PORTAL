import dotenv from 'dotenv';
dotenv.config();
import  express,{Request,Response}  from "express"
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes'
import usreRoutes from './routes/userRoutes'
import profileRoutes from './routes/ProfileRoutes'
import skillRoutes from './routes/skillsRoutes'
import resumeRoutes from './routes/resumeRoutes'
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationsRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth',authRoutes);
app.use('/api/users',usreRoutes);
app.use('/api/profiles',profileRoutes);
app.use('/api/skills',skillRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/applications',applicationRoutes);

app.get('/health',(req:Request,res:Response)=>{
  res.status(200).json({success:true,message:"server is running"});
})

connectDB();

const PORT = process.env.PORT ||5000;

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
})