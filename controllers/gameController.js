const GameService = require('../services/GameService');
const gameService = new GameService();

exports.newgame = async (request, response) => {
    const id = request.userInfo.Id;
    const name = request.userInfo.name;
    let game = await gameService.getGameById(id);
    let board = gameService.getNewGame();

    if (!game) {
        await gameService.insertNewGame(id, board);
    } else {
        await gameService.updateGame(id, board);
    }

    game = await gameService.getGameById(id);

    response.render('game', {
        name,
        game: game.sudoku
    })
};

exports.play = async (request, response) => {
    const id = request.userInfo.Id;
    const name = request.userInfo.name;
    let game = await gameService.getGameById(id);
    if (!game) {
        const board = gameService.getNewGame();
        gameService.insertNewGame(id, board);
        let game = await gameService.getGameById(id);
        response.render('game_test', {
            name,
            game: game.sudoku,
        });
    }
    // response.json(game.sudoku);
    response.render('game_test', {
        name,
        game: game.sudoku,
    });
};
