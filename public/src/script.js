
let board = [
{x: 0, y: 0, id: 0, number: 7},
{x: 1, y: 0, id: 1, number: 5},
{x: 2, y: 0, id: 2, number: 6},
{x: 3, y: 0, id: 3, number: 0},
{x: 4, y: 0, id: 4, number: 0},
{x: 5, y: 0, id: 5, number: 4},
{x: 6, y: 0, id: 6, number: 9},
{x: 7, y: 0, id: 7, number: 8},
{x: 8, y: 0, id: 8, number: 1},
{x: 0, y: 1, id: 9, number: 8},
{x: 1, y: 1, id: 10, number: 1},
{x: 2, y: 1, id: 11, number: 9},
{x: 3, y: 1, id: 12, number: 6},
{x: 4, y: 1, id: 13, number: 5},
{x: 5, y: 1, id: 14, number: 7},
{x: 6, y: 1, id: 15, number: 4},
{x: 7, y: 1, id: 16, number: 3},
{x: 8, y: 1, id: 17, number: 2},
{x: 0, y: 2, id: 18, number: 2},
{x: 1, y: 2, id: 19, number: 4},
{x: 2, y: 2, id: 20, number: 3},
{x: 3, y: 2, id: 21, number: 8},
{x: 4, y: 2, id: 22, number: 1},
{x: 5, y: 2, id: 23, number: 9},
{x: 6, y: 2, id: 24, number: 7},
{x: 7, y: 2, id: 25, number: 0},
{x: 8, y: 2, id: 26, number: 5},
{x: 0, y: 3, id: 27, number: 9},
{x: 1, y: 3, id: 28, number: 3},
{x: 2, y: 3, id: 29, number: 0},
{x: 3, y: 3, id: 30, number: 2},
{x: 4, y: 3, id: 31, number: 4},
{x: 5, y: 3, id: 32, number: 6},
{x: 6, y: 3, id: 33, number: 1},
{x: 7, y: 3, id: 34, number: 5},
{x: 8, y: 3, id: 35, number: 8},
{x: 0, y: 4, id: 36, number: 1},
{x: 1, y: 4, id: 37, number: 8},
{x: 2, y: 4, id: 38, number: 5},
{x: 3, y: 4, id: 39, number: 9},
{x: 4, y: 4, id: 40, number: 7},
{x: 5, y: 4, id: 41, number: 3},
{x: 6, y: 4, id: 42, number: 2},
{x: 7, y: 4, id: 43, number: 4},
{x: 8, y: 4, id: 44, number: 6},
{x: 0, y: 5, id: 45, number: 6},
{x: 1, y: 5, id: 46, number: 0},
{x: 2, y: 5, id: 47, number: 4},
{x: 3, y: 5, id: 48, number: 5},
{x: 4, y: 5, id: 49, number: 8},
{x: 5, y: 5, id: 50, number: 1},
{x: 6, y: 5, id: 51, number: 3},
{x: 7, y: 5, id: 52, number: 7},
{x: 8, y: 5, id: 53, number: 9},
{x: 0, y: 6, id: 54, number: 4},
{x: 1, y: 6, id: 55, number: 9},
{x: 2, y: 6, id: 56, number: 1},
{x: 3, y: 6, id: 57, number: 7},
{x: 4, y: 6, id: 58, number: 6},
{x: 5, y: 6, id: 59, number: 5},
{x: 6, y: 6, id: 60, number: 8},
{x: 7, y: 6, id: 61, number: 2},
{x: 8, y: 6, id: 62, number: 3},
{x: 0, y: 7, id: 63, number: 3},
{x: 1, y: 7, id: 64, number: 6},
{x: 2, y: 7, id: 65, number: 2},
{x: 3, y: 7, id: 66, number: 4},
{x: 4, y: 7, id: 67, number: 9},
{x: 5, y: 7, id: 68, number: 8},
{x: 6, y: 7, id: 69, number: 5},
{x: 7, y: 7, id: 70, number: 1},
{x: 8, y: 7, id: 71, number: 7},
{x: 0, y: 8, id: 72, number: 5},
{x: 1, y: 8, id: 73, number: 7},
{x: 2, y: 8, id: 74, number: 0},
{x: 3, y: 8, id: 75, number: 1},
{x: 4, y: 8, id: 76, number: 3},
{x: 5, y: 8, id: 77, number: 2},
{x: 6, y: 8, id: 78, number: 6},
{x: 7, y: 8, id: 79, number: 9},
{x: 8, y: 8, id: 80, number: 4} ]


let gameBoard = document.getElementById('root');
let n = 0;
let init = {
    gameId: '',
    possId: '',
    possNum: '',
    boardNum: '',
};
//handlers

function keydownHandler(event, cell) {
    let item = document.getElementById(`${cell.id}`);
    if (!item.classList.contains('start')) {
        if ('123456789'.includes(event.key)) {
            cell.number = event.key;
            init.boardNum = cell.number;
        } else if (['Backspace', 'Delete'].includes(event.key)) {
            cell.number = 0;
        }
    }
    event.preventDefault();
    viewUpdate();
}

function focusHandler(event, cell) {
    possibleNumbersUpdate(event, cell);

    let item = document.getElementById(`${cell.id}`);
    if (!item.classList.contains('start')) {
        init.gameId = cell.id;
        if (cell.number) {
            init.boardNum = cell.number;
        }
        // possibleNumbers(event, cell.id);
        possibleNumbers();
    }

    let column = document.getElementsByClassName('column')[cell.id];
    column.classList.add('selected');
    for (let i = 0; i < board.length; i++) {
        if (board[i].x == cell.x || board[i].y == cell.y) {
            let column = document.getElementsByClassName('column')[board[i].id];
            column.classList.add('marked');
        }
    }
}

function blurHandler(event, cell) {
    for (let i = 0; i < board.length; i++) {
        let item = document.getElementsByClassName('column')[i];
        item.classList.remove('marked');
        item.classList.remove('selected');
    }
}

//create board
for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < 9; j++) {
        const cell = board[n];
        const column = document.createElement('input');
        column.classList.add('column');
        column.setAttribute('id', n);
        column.setAttribute('type', 'text');
        if (cell.number) {
            column.classList.add('start');
            column.setAttribute('disabled', 'false');
        }
        column.addEventListener('keydown', (event) =>
            keydownHandler(event, cell)
        );
        column.addEventListener('focus', (event) => focusHandler(event, cell));
        column.addEventListener('blur', (event) => blurHandler(event, cell));
        row.append(column);
        n++;
    }
    gameBoard.append(row);
}

function viewUpdate() {
    for (let i = 0; i < board.length; i++) {
        let item = document.getElementsByClassName('column')[i];
        item.value = board[i].number ? board[i].number : '';
    }
}

viewUpdate();

//possible

const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('delete');
addBtn.addEventListener('click', (event) => addPossibleNumber(event)); 
deleteBtn.addEventListener('click', (event) => deletePossibleNumber(event));
possibleBoard();

function possibleBoard() {
    let possible = document.getElementById('possible');
    for (let i = 0; i < 9; i++) {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `id_${i}`);
        input.classList.add('poss');
        input.addEventListener('focus', (event) => possibleFocusHandler(event));
        possible.append(input);
    }
}

function possibleNumbers(event, id) {
    // let numbers = sudoku.possibleNumbers(id);
    let numbers = [1,2,3,4,5,6,7,8,9]
    for (let i = 0; i < numbers.length; i++) {
        let possItem = document.getElementsByClassName('poss')[i];
        possItem.value = numbers[i];
    }
}

function possibleNumbersUpdate(event, cell) {
    let possItems = document.getElementsByClassName('poss');
    for (let i = 0; i < possItems.length; i++) {
        possItems[i].value = '';
    }
}

function possibleFocusHandler(event) {
    init.possId = event.target.id;
    init.possNum = event.target.value;
}

function addPossibleNumber(event) {
    let gameId = init.gameId;
    let possId = init.possId;
    let possNum = init.possNum;
    let item = document.getElementById(gameId);
    item.value = possNum;
    let poss = document.getElementById(possId);
    poss.value = '';
    board[gameId].number = +possNum;
    possibleNumbersUpdate();
    // possibleNumbers(event, gameId);
    possibleNumbers();
    for (const key in init) {
        init[key] = '';
    }
    if (sudoku.checkEndGame()) {
        const seconds = parseInt((new Date().getTime() - startDate)/1000);
        console.log('over');
        let alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add('alert-info');
        alert.innerHTML = `Your score is ${seconds} seconds`;
        gameBoard.append(alert);
    }
}

function deletePossibleNumber(event) {
    let gameId = init.gameId;
    board[gameId].number = 0;
    document.getElementById(gameId).value = '';
    possibleNumbersUpdate();
    // possibleNumbers(event, gameId);
    possibleNumbers();
    for (const key in init) {
        init[key] = '';
    }
}
