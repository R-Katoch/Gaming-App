// Import necessary dependencies
import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtTokenSecret = "Rohit-Balley-Ankit";

// Define the signup controller function
const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Define the login controller function
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If the password matches, generate a JWT token
        const token = jwt.sign({ userId: user._id }, jwtTokenSecret, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ userId: user._id }, jwtTokenSecret, { expiresIn: '100h' });


        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend's domain
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // Return the token as the response
        return res.status(200).json({ token, refreshToken, message: "User Logged in Successfully" });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const logoutController = async (req, res) => {
    try {
        // Clear the user's authentication token (e.g., remove it from client-side storage)

        // Additional cleanup or necessary actions, if any

        // Return a success response
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Export the signup controller
export { signupController, loginController, logoutController };
