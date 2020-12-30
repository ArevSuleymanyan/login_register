import Sudoku from './Sudoku.js';

const sudoku = new Sudoku();

console.log(sudoku);

function SudokuGame() {
    fetch('http://localhost:3000/api/board')
        .then((response) => response.json())
        .then((result) => init(result));

    function init(board) {
        createGameBoard(board);
        viewUpdate(board);
    }
    const cell = {
        board_id: '',
        poss_id: '',
        number: '',
    };

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
                    column.setAttribute('disabled', 'false');
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

    function clickHandler(event) {
        let id = event.target.id;
        cell.board_id = id;
        viewUpdatePossible(id);
        console.log('clickHandler: id: ->', id);
        console.log('cell: ->', cell);
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
    createButtons();

    function addNumberHandler(event) {
        console.log(event);
    }

    function deleteNumberHandler(event) {
        console.log(event);
    }
    function createPossibleBoard() {
        let possible = document.getElementById('possible');
        for (let i = 0; i < 9; i++) {
            let div = document.createElement('div');
            div.classList.add('poss');
            div.setAttribute('id', `_${i}`);
            div.addEventListener('click', (event) =>
                possibleClickHandler(event)
            );
            possible.append(div);
        }
    }
    createPossibleBoard();

    function viewUpdatePossible(id) {
        let possibleNumbers = sudoku.possibleNumbers(id);
        let possibleBoard = document.getElementsByClassName('poss');
        for (const item of possibleBoard) {
            item.innerHTML = '';
        }
        for (let i = 0; i < possibleNumbers.length; i++) {
            if (possibleNumbers[i]) {
                possibleBoard[i].innerHTML = possibleNumbers[i];
            }
        }
    }

    function possibleClickHandler(event) {
        let id = event.target.id;
        let poss = document.getElementById(id);
        cell.poss_id = id;
        cell.number = poss.innerHTML;
        console.log('possibleClickHandler: ->', poss);
        console.log('pch:cell: ->', cell);
    }
}

SudokuGame();
