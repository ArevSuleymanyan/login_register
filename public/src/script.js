// function SudokuGame() {
//     fetch('http://localhost:3000/api/board')
//         .then((response) => response.json())
//         .then((result) => init(result));
//     function init(board) {
//         // createGameBoard(board);
//         // viewUpdate(board);
//         console.log(board);
//     }
// }
// SudokuGame();

import Sudoku from './Sudoku.js';

const sudoku = new Sudoku();
sudoku.runGame();
const board = [];
const cell = {
    b_id: '',
    p_id: '',
    num: '',
}

for (let i = 0; i < sudoku.board.length; i++) {
    board.push(sudoku.board[i].number);
}

function createGameBoard(board) {
    let root = document.getElementById('root');
    let n = 0;
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 9; j++) {
            const column = document.createElement('div');
            column.classList.add('column');
            column.setAttribute('id', n);
            column.setAttribute('type', 'text');
            if (board[n]) {
                column.classList.add('start');
            } else {
                column.addEventListener('click', (event) =>
                    clickHandler(event)
                );
            }

            row.append(column);
            n++;
        }
        root.append(row);
    }
}

function viewUpdate(board) {
    for (let i = 0; i < board.length; i++) {
        let item = document.getElementsByClassName('column')[i];
        item.innerHTML = board[i] ? board[i] : '';
    }
}

function createPossibleBoard() {
    let possible = document.getElementById('possible');
    for (let i = 0; i < 9; i++) {
        let div = document.createElement('div');
        div.classList.add('poss');
        div.setAttribute('id', `_${i}`);
        possible.append(div);
    }
}

function viewUpdatePossible(id) {
    let possibleNumbers = sudoku.possibleNumbers(id);
    let possibleBoard = document.getElementsByClassName('poss');
    for (const item of possibleBoard) {
        item.innerHTML = '';
    }
    for (let i = 0; i < possibleNumbers.length; i++) {
        if (possibleNumbers[i]) {
            possibleBoard[i].innerHTML = possibleNumbers[i];
            possibleBoard[i].addEventListener('click', (event) => possibleClickHandler(event));
        }
    }
}

function possibleClickHandler(event) {
    cell.p_id = event.target.id
    cell.num = document.getElementById(event.target.id).innerHTML;

}

function clickHandler(event) {
    cell.b_id = event.target.id;
    console.log(cell)
    viewUpdatePossible(event.target.id);
}

function createButtons() {
    let btn = document.getElementById('btn');
    let add = document.createElement('buttin');
    add.innerHTML = 'ADD';
    add.classList.add('btn', 'btn-secondary');
    add.addEventListener('click', (event) => addNumberHandler(event));
    let del = document.createElement('buttin');
    del.innerHTML = 'DELETE';
    del.classList.add('btn', 'btn-secondary');
    del.addEventListener('click', (event) => deleteNumberHandler(event));
    btn.append(add, del);
}

function addNumberHandler(event) {
    sudoku.board[cell.b_id].number = +cell.num;
    board[cell.b_id] = +cell.num;
    cell.num = '';
    viewUpdate(board);
    viewUpdatePossible(+cell.b_id)
}

function deleteNumberHandler(event) {
    sudoku.board[cell.b_id].number = 0;
    board[cell.b_id] = 0;
    viewUpdate(board);
    viewUpdatePossible(+cell.b_id)
    console.log(event.target)
}

createButtons();
createPossibleBoard();
createGameBoard(board);
viewUpdate(board);
