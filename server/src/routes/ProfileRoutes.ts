import { authMiddleware } from './../middleware/auth';
// routes/profileRoutes.ts
import { Router } from 'express';
import {
  createSeekerProfile,
  getSeekerProfile,
  updateSeekerProfile,
  createEmployerProfile,
  getEmployerProfile,
  updateEmployerProfile
} from '../controllers/ProfileControllers';

const router = Router();

// Job Seeker Profile Routes
router.post('/seeker', authMiddleware, createSeekerProfile);
router.get('/seeker', authMiddleware, getSeekerProfile);
router.put('/seeker', authMiddleware, updateSeekerProfile);

// Employer Profile Routes
router.post('/employer', authMiddleware, createEmployerProfile);
router.get('/employer', authMiddleware, getEmployerProfile);
router.put('/employer/:id', authMiddleware, updateEmployerProfile);

export default router;