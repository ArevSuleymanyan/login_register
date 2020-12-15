const { connection } = require('../db');
const SudokuLogic = require('../model/SudokuLogic');
const util = require('util');
const queryPromisify = util.promisify(connection.query).bind(connection);

class GameService{
    getNewGame() {
        const sudoku = new SudokuLogic();
        sudoku.runGame();
        const board = sudoku.board;
        const sudokuBoard = [];
        for (let i = 0; i < board.length; i++) {
          sudokuBoard.push(board[i].number);
        }
        return sudokuBoard;
      }
      
      getGameById(id) {
        const sql = `SELECT * FROM game WHERE user_id=${id}`;
        return queryPromisify(sql)
        .then(result => result[0])
        .catch(error => console.log('error from  getGameById:', error))
      }
      
      insertNewGame(id, board) {
        const json = JSON.stringify(board);
        const sql = `INSERT game(user_id, sudoku) VALUES (${id}, ?)`;
        connection.query(sql, [json], (error, results) => {
          if (error) {
            console.log('Error from insertNewGame:', error.message);
          } else {
            console.log('insert new game in db');
          }
        });
      }
    
      updateGame(id, board) {
        const json = JSON.stringify(board)
        const sql = `UPDATE game SET sudoku = ? WHERE user_id=${id}`;
        connection.query(sql,[json], (error, results) => {
          if (error) {
            console.log('Error from updateGame:', error.message);
          } else {
            console.log('game is update');
          }
        });
      }

}

module.exports = GameService