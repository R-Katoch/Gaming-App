// import { initialiseBets } from "../index.mjs";
import { getCounter, io } from "../index.mjs";

async function startGame(req, res) {
    console.log("Starting game ");
    bets = {};
}

async function endGame(req, res) {
    console.log("Ending Game");
    console.log(bets);
    let winners = {}; // Variable to store the winners
    const totals = {
        '7up': 0,
        '7down': 0,
        '7': 0
    };

    // Track users for each choice
    const users = {
        '7up': [],
        '7down': [],
        '7': []
    }

    for (let userId in bets) {
        const [choice, amount] = bets[userId];

        totals[choice] += amount;
        users[choice].push(userId);
    }

    let minBet = Infinity;
    let winningChoice;

    for (let bet in totals) {
        if (totals[bet] < minBet) {
            minBet = totals[bet];
            winningChoice = bet;
        }
    }
    // Get the list of winners
    winners = {
        winningChoice,
        users: users[winningChoice]
    };

    // Output result
    console.log(`Winning choice: ${winningChoice}`);
    console.log(`Users who bet on ${winningChoice}:`);
    console.log(winners.users);

    await sendWinnersToFrontend(winners);
    startGame();
}

async function sendWinnersToFrontend(winners) {
    // Assuming you have a way to send the winners to the frontend, use the appropriate method here.
    console.log('Sending winners to the frontend:', winners);
    io.emit('winners', winners);
    // Example: socket.emit('winners', winners);
}

async function placeBets(req, res) {
    const { userId, choice, amount } = req.body;

    // Get current counter
    const counter = await getCounter();

    // Only allow bets if > 10 secs left
    if (counter > 5) {
        bets[userId] = [choice, amount];
        res.send('Bet placed!');
    } else {
        res.status(400).send('No more bets allowed');
    }
}

export { startGame, endGame, placeBets }