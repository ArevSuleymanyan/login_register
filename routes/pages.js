const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const userService = new UserService();

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

router.get('/play', async (request, response) => {
    const id = request.userInfo.Id;
    let game = await userService.getGameById(id);
    if (!game) {
      const board = userService.getNewGame();
      userService.insertNewGame(id, board);
      let game = await userService.getGameById(id);
      response.json(game.sudoku);
    } else {
      response.json(game.sudoku);
    }

});

router.get('/game', async (request, response) => {
  
    const id = request.userInfo.Id;
    let game = await userService.getGameById(id);
    if (!game) {
      let board = userService.getNewGame();
      userService.insertNewGame(id, board);
      let game = await userService.getGameById(id);
      response.json(game.sudoku);
    } else {
      let board = userService.getNewGame();
     await userService.updateGame(id, board);
      let game = await userService.getGameById(id);
      response.json(game.sudoku);
    }
 
});

module.exports = router;
