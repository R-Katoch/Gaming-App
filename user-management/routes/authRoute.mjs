// Import necessary dependencies
import express from 'express';
import { signupController, loginController, logoutController } from '../controllers/authController.mjs';
import { authenticateUser } from '../middleware/authMiddleware.mjs';

// Create a router instance
const router = express.Router();

// Define the user signup route
router.post('/signup', authenticateUser, signupController);

// Define the user login route
router.post('/login', authenticateUser, loginController);

// Define the logout route
router.post('/logout', authenticateUser, logoutController);

// Export the router
export default router;
