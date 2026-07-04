import { Router } from "express";
import { authMiddleware, authorizeRole } from "../middleware/auth";
import {
  createSkill,
  getAdminDashboard,
  getEmployerDashboard,
  getNotifications,
  getPlatformStats,
  getSeekerDashboard,
  getRecentActivity,
  markNotificationRead,
  trackActivity,
} from "../controllers/AdminController";
import {
  getAllUsers,
  toggleUserBan,
  updateUserRole,
} from "../controllers/authController";

const router = Router();

router.use(authMiddleware);

router.get("/seeker", authorizeRole("seeker"), getSeekerDashboard);
router.get("/employer", authorizeRole("employer"), getEmployerDashboard);
router.get("/", authorizeRole("admin"), getAdminDashboard);
router.get("/stats", authorizeRole("admin"), getPlatformStats);
router.post("/activity", trackActivity);
router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markNotificationRead);
router.post("/skill", authorizeRole("admin"), createSkill);
router.get("/activity/recent", getRecentActivity);
router.get("/users", authorizeRole("admin"), getAllUsers);
router.patch("/users/:id/ban", authorizeRole("admin"), toggleUserBan);
router.patch("/users/:id/role", authorizeRole("admin"), updateUserRole);

export default router;
