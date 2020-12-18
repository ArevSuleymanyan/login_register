const GameService = require('../services/GameService');

const gameService = new GameService();

exports.newgame = async (request, response) => {
    const id = request.userInfo.Id;
    let game = await gameService.getGameById(id);
    let board = gameService.getNewGame();

    if (!game) {
        await gameService.insertNewGame(id, board);
    } else {
        await gameService.updateGame(id, board);
    }

    game = await gameService.getGameById(id);
    response.json(game.sudoku);
};

exports.play = async (request, response) => {
    const id = request.userInfo.Id;
    let game = await gameService.getGameById(id);
    if (!game) {
        const board = gameService.getNewGame();
        gameService.insertNewGame(id, board);
        let game = await gameService.getGameById(id);
        response.json(game.sudoku);
        return;
    }
    response.json(game.sudoku);
};
