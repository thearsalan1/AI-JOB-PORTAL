// routes/userRoutes.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getUserProfile,
  getUserById,
  getAllSeekers,
  getAllEmployers,
  updateUser
} from '../controllers/userControllers';



const router = Router();

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getUserProfile);
router.put('/update',authMiddleware,  updateUser);

// Public routes (or add authenticate if needed)
router.get('/seekers',authMiddleware, getAllSeekers);
router.get('/employers',authMiddleware, getAllEmployers);
router.get('/:id',authMiddleware, getUserById);

export default router;