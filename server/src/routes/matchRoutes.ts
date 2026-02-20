import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getUserMatches, getJobMatches,
  recalculateMatches, getRecommendations,
  getMatchDetails
} from '../controllers/JobMatchController';

const router = Router();

router.use(authMiddleware);

router.get('/', getUserMatches);
router.get('/recommendations', getRecommendations);
router.get('/job/:jobId', getJobMatches);
router.post('/recalc', recalculateMatches);
router.get('/:matchId', getMatchDetails);

export default router;