import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js';
import { registerValidation, loginValidation, validate } from '../middleware/validators.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

// Protected routes
router.get('/me', authenticate, getCurrentUser);

export default router;