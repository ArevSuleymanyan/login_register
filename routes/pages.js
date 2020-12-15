const express = require('express');
const router = express.Router();
const GameService = require('../services/GameService');

const gameService = new GameService();

router.get('/', (request, response) => {
  if (request.userInfo) {
    let userName = request.userInfo.name;
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    response.render('home', {
      name: `${userName}`,
      title: `Welcome ${userName}`,
    });
  } else {
    response.render('home', {
      title: 'Home',
    });
  }
});

router.get('/login', (request, response) => {
  response.render('login', {
    title: 'Login',
  });
});

router.get('/register', (request, response) => {
  response.render('register', {
    title: 'Register',
  });
});

router.get('/logout', (request, response) => {
  response.clearCookie('jwt');
  response.redirect('/');
});

// router.get('/play', async (request, response) => {
//     const id = request.userInfo.Id;
//     let game = await gameService.getGameById(id);
//     if (!game) {
//       const board = gameService.getNewGame();
//       gameService.insertNewGame(id, board);
//       let game = await gameService.getGameById(id);
//       response.json(game.sudoku);
//     } else {
//       response.json(game.sudoku);
//     }
// });

// router.get('/game', async (request, response) => {
//     const id = request.userInfo.Id;
//     let game = await gameService.getGameById(id);
//     if (!game) {
//       let board = gameService.getNewGame();
//       gameService.insertNewGame(id, board);
//       let game = await gameService.getGameById(id);
//       response.json(game.sudoku);
//     } else {
//       let board = gameService.getNewGame();
//      await gameService.updateGame(id, board);
//       let game = await gameService.getGameById(id);
//       response.json(game.sudoku);
//     }
// });

module.exports = router;
