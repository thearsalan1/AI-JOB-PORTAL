import {Router} from 'express';
import {getJobs, getJobById,closeJob, createJob, updatejob, deleteJob, getSavedJobs, toggleSaveJob} from '../controllers/JobControllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (employers only)
router.use(authMiddleware)
router.post('/', createJob);
router.put('/:id', updatejob);
router.delete('/:id', deleteJob);
router.patch('/:id/close', closeJob);
router.get('/saved',getSavedJobs);
router.post('/:id/save',toggleSaveJob);

export default router;