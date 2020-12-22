const express = require('express');
const GameService = require('../services/GameService');

const router = express.Router();
const gameService = new GameService();

router.get('/board', (request, response) => {
    const board = gameService.getNewGame();
    response.json(board);
});

module.exports = router;
