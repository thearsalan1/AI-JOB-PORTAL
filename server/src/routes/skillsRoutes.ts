import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { 
  getAllSkills, createSkill, 
  getUserSkills, addUserSkill, removeUserSkill,
  getSkillsByCategory, searchSkills
} from '../controllers/skillController';

const router = Router();

// Public routes (skills master list)
router.get('/', getAllSkills);
router.get('/category/:category', getSkillsByCategory);
router.get('/search', searchSkills);

// Protected routes
router.use(authMiddleware);
router.post('/', createSkill);  // Admin only later
router.get('/user', getUserSkills);
router.post('/user', addUserSkill);
router.delete('/user/:skillId', removeUserSkill);

export default router;
