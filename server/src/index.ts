import dotenv from 'dotenv';
dotenv.config();
import  express,{Request,Response}  from "express"
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes'


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth',authRoutes)

app.get('/health',(req:Request,res:Response)=>{
  res.status(200).json({success:true,message:"server is running"});
})

connectDB();

const PORT = process.env.PORT ||5000;

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
})