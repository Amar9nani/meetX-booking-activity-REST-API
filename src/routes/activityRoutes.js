import express from 'express';
import { 
  getAllActivities, 
  getActivityById, 
  bookActivity, 
  getUserBookings 
} from '../controllers/activityController.js';
import { bookingValidation, validate } from '../middleware/validators.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllActivities);
router.get('/:id', getActivityById);

// Protected routes
router.post('/:id/book', authenticate, bookActivity);
router.get('/user/bookings', authenticate, getUserBookings);

export default router;