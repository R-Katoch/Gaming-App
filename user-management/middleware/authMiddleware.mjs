// Import necessary dependencies
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const jwtTokenSecret = "Rohit-Balley-Ankit";

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the request headers or any other appropriate location
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token and decode its payload
        const decoded = jwt.verify(token, jwtTokenSecret);

        // Find the user associated with the decoded token
        const user = await User.findById(decoded.userId).exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set the user on the request object for subsequent route handling
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Export the middleware function
export { authenticateUser };
