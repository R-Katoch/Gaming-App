import express from 'express';
import { addFundsController } from '../controllers/fundsController.mjs';

// Create a router instance
const router = express.Router();

// Define the user signup route
router.post('/add', addFundsController);

// Export the router
export default router;