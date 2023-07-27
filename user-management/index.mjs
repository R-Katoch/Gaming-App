import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoute.mjs'
import fundsRoutes from './routes/fundsRoute.mjs'

const app = express();
const PORT = 3001;

app.use(cors({
    origin: "*",
}));

mongoose.connect('mongodb://localhost:27017/BetWin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/funds', fundsRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});