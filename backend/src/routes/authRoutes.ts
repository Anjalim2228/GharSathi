import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  joinFamily,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/join-family', protect, joinFamily);

export default router;
