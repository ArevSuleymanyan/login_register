const express = require('express');
const GameService = require('../services/GameService');

const router = express.Router();
const gameService = new GameService();

router.get('/board', async(request, response) => {
    const id =  request.userInfo.Id;
    let game = await gameService.getGameById(id);
    const board = game.sudoku;
    response.status(200).json(board);
});

module.exports = router;

