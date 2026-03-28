import { Router } from 'express';
import { authMiddleware, authorizeRole } from '../middleware/auth';
import { createSkill, getAdminDashboard, getEmployerDashboard, getNotifications, getPlatformStats, getSeekerDashboard, markNotificationRead, trackActivity } from '../controllers/AdminController';

const router = Router();

router.use(authMiddleware);

router.get('/seeker', authorizeRole('seeker'), getSeekerDashboard);
router.get('/employer', authorizeRole('employer'), getEmployerDashboard);
router.get('/', authorizeRole('admin'), getAdminDashboard);
router.get('/stats', authorizeRole('admin'), getPlatformStats);
router.post('/activity', trackActivity);
router.get('/notifications', getNotifications);
router.patch('/notifications/:id/read', markNotificationRead);
router.post('/skill', createSkill);  // Admin only later

export default router;