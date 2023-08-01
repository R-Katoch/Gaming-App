import User from '../models/user.mjs';

async function addFundsController(req, res) {
    try {
        const userId = req.body.userId;
        const amount = req.body.amount;

        // Find the user document
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Update the user's amount field
        user.amount = user.amount + amount;

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: "Successfully added funds!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { addFundsController };