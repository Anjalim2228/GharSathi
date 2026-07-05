import express from 'express';
import { getTasks, createTask, updateTaskStatus } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.patch('/:id', protect, updateTaskStatus);

export default router;
