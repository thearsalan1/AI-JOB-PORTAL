import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {createApplication, getUserApplications, 
  getJobApplications, updateApplicationStatus, 
  getApplicationResume 
} from '../controllers/applicatonController';

const router = Router();

router.use(authMiddleware);

router.post('/', createApplication);
router.get('/', getUserApplications);
router.get('/job/:jobId', getJobApplications);
router.patch('/:id/status', updateApplicationStatus);
router.get('/:id/resume', getApplicationResume);

export default router;