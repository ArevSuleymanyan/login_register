const express = require("express");
const gameController = require('../controller/gameController');
const router = express.Router();

router.get('/newgame', gameController.newgame);
router.get('/play', gameController.play);

module.exports = router;