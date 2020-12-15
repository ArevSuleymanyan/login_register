const { connection } = require('../db');
const GameService = require('../services/GameService');
const gameService = new GameService();

exports.newgame = async (request, response) => {
  const id = request.userInfo.Id;
  let game = await gameService.getGameById(id);
  if (!game) {
    let board = gameService.getNewGame();
    gameService.insertNewGame(id, board);
    let game = await gameService.getGameById(id);
    response.json(game.sudoku);
  } else {
    let board = gameService.getNewGame();
    await gameService.updateGame(id, board);
    let game = await gameService.getGameById(id);
    response.json(game.sudoku);
  }
};

exports.play = async (request, response) => {
  const id = request.userInfo.Id;
  let game = await gameService.getGameById(id);
  if (!game) {
    const board = gameService.getNewGame();
    gameService.insertNewGame(id, board);
    let game = await gameService.getGameById(id);
    response.json(game.sudoku);
  } else {
    response.json(game.sudoku);
  }
};
