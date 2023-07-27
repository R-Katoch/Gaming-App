import express from 'express';
import { startGame, endGame, placeBets } from '../controllers/gameController.mjs';

const router = express.Router();

router.post('/startGame', startGame);

router.post('/endGame', endGame);

router.post('/placeBets', placeBets);

export default router;