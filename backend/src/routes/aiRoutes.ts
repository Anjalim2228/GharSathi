import express from 'express';
import { getDailyBriefing } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/briefing', protect, getDailyBriefing);
router.post('/chat', protect, chatWithAI);

export default router;
