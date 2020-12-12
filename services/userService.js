const { connection } = require("../db");
const SudokuLogic = require("../game/sudoku");

class UserService {

    getUserById(userId){
        const sql = `SELECT * FROM users WHERE Id =${userId}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            })
        })
    }

    insertGameInDb(sql){
        const sudoku = new SudokuLogic();
        sudoku.runGame();
        const board = sudoku.board;
        const sudokuBoard = [];
        for(let i = 0; i < board.length; i++){
            sudokuBoard.push(board[i].number);
        }
        const json = JSON.stringify(sudokuBoard);
        connection.query(sql, [json], (error, results) => {
            if(error){
                console.log('Error from insertGameInDb:', error.message);
            }else {
                console.log('data added');
            }
        })

    }
    getGameById(userId){
        const sql = `SELECT * FROM game WHERE user_id =${userId}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            })
        })
    }

}
module.exports = UserService;