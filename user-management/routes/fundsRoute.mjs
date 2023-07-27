import express from 'express';
import { signupController, loginController, logoutController } from '../controllers/authController.mjs';

// Create a router instance
const router = express.Router();

// Define the user signup route
router.post('/add', addFundsController);

// Export the router
export default router;