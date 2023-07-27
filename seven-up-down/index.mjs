import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { setInterval, clearInterval } from 'node:timers';
import { startGame, endGame } from './controllers/gameController.mjs'
import gameRoutes from './routes/gameRoutes.mjs'

const app = express();
global.bets = {};
const PORT = 3002;
let timerId;
let counter = 31;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    // When a client connects, we'll send the current counter value and list of winners (empty at the start) to the frontend
    socket.emit('counter', counter);
    socket.emit('winners', { winningChoice: null, users: [] });
});

setInterval(async () => {
    counter--;
    if (counter > 0) {
        console.log(counter + ' seconds left');
    } else {
        console.log('Restarting timer...');
        await endGame();
        counter = 31;
    }
}, 1000);

app.use(express.json());

app.use(cors({
    origin: "*",
}));

app.use('/7up-down', gameRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function getCounter() {
    return counter;
}

// async function initialiseBets(bets) {
//     bets = bets;
//     return bets;
// }

export { getCounter, io };
