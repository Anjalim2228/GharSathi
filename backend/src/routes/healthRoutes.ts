import express from 'express';
import { getHealthRecords, addHealthRecord, getHealthSummary } from '../controllers/healthController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getHealthRecords)
  .post(protect, addHealthRecord);

router.get('/summary', protect, getHealthSummary);

export default router;
