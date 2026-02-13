import { RequestHandler, Router } from "express";
import { createResume, deleteResume, downloadResume, getResume, parseResume, shareResume, updateParsedData, uploadResume,toggleResumeSharing, getUserResumes } from "../controllers/resumeController";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/multerConfig";

const router = Router();

// Public route - no auth required (employer access)
router.get('/:id/shared', shareResume);     

// All routes below require authentication
router.use(authMiddleware);

router.post('/upload', upload.single('resume'), uploadResume as RequestHandler);     // 1
router.post('/parse', parseResume);         
router.post('/', createResume);             
router.get('/', getUserResumes); 
router.get("/:id/share",shareResume)           
router.get('/:id', getResume);              
router.get('/:id/download', downloadResume);
router.delete('/:id', deleteResume);        
router.put('/:id/parsed', updateParsedData);
router.patch('/:id/share', toggleResumeSharing);                  

export default router;