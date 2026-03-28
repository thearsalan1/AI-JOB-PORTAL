import {Router} from 'express';
import {getJobs, getJobById,closeJob, createJob, updatejob, deleteJob, getSavedJobs, toggleSaveJob} from '../controllers/JobControllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getJobs);

// Protected routes
router.use(authMiddleware);

// Saved jobs routes
router.get('/saved', getSavedJobs);
router.post('/:id/save', toggleSaveJob);

// Job routes
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updatejob);
router.delete('/:id', deleteJob);
router.patch('/:id/close', closeJob);


export default router;