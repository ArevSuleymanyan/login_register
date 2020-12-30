// let url = 'http://localhost:3000/api/board';
// async function getData(url){
//     let response = await fetch(url);
//     let result = await response.json();
//     console.log(result) 
// }
// getData(url)



fetch('http://localhost:3000/api/board')
    .then((response) => response.json())
    .then((result) => getGame(result));

function getGame(board) {
    createGameBoard(board);
    viewUpdate(board);
    possibleBoard();
    possibleNumbers(event, board, number);
}

function createGameBoard(board) {
    let root = document.getElementById('root');
    let n = 0;
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 9; j++) {
            const column = document.createElement('input');
            column.classList.add('column');
            column.setAttribute('id', n);
            column.setAttribute('type', 'text');
            if (board[n]) {
                column.classList.add('start');
                column.setAttribute('disabled', 'false');
            }
            column.addEventListener('keydown', (event) =>
                keydownHandler(event, board, n)
            );
            column.addEventListener('focus', (event) =>
                focusHandler(event, board)
            );
            column.addEventListener('blur', (event) =>
                blurHandler(event, board)
            );
            if (board[n]) {
                column.classList.add('start');
                column.setAttribute('disabled', 'false');
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
        item.value = board[i] ? board[i] : '';
    }
}

function blurHandler(event, board) {
    for (let i = 0; i < board.length; i++) {
        let item = document.getElementsByClassName('column')[i];
        item.classList.remove('marked');
        item.classList.remove('selected');
    }
}

function keydownHandler(event, board) {
    let cell = event.target.id;
    let item = document.getElementById(`${cell}`);
    console.log('cell: ', cell);
    console.log('item: ', item);
    if (!item.classList.contains('start')) {
        console.log(item.classList);
        if ('123456789'.includes(event.key)) {
            board[cell] = event.key;
        } else if (['Backspace', 'Delete'].includes(event.key)) {
            board[cell] = 0;
        }
    }
    event.preventDefault();
    viewUpdate(board);
}

function focusHandler(event, board) {
    let cell = event.target.id;
    let indexX = cell % 9;
    let indexY = parseInt(cell / 9);
    let column = document.getElementsByClassName('column')[cell];
    column.classList.add('selected');
    for (let i = 0; i < board.length; i++) {
        if (parseInt(i / 9) === indexY || i % 9 === indexX) {
            let column = document.getElementsByClassName('column')[i];
            column.classList.add('marked');
        }
    }
}

function possibleBoard() {
    let possible = document.getElementById('possible');
    for (let i = 0; i < 9; i++) {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `id_${i}`);
        input.classList.add('poss');
        possible.append(input);
    }
}

function checkVertical(event, board, number) {
    for (let i = 0; i < board.length; i++) {
        if (i % 9 === event.target.id && board[i] === number) {
            return false;
        }
        return true;
    }
}


function checcheckHorizontal(event, board, number) {
    for (let i = 0; i < board.length; i++) {
        if (parseInt(i / 9) === event.target.id && board[i] === number) {
            return false;
        }
        return true;
    }
}


function checkMatrix(event, board, number) {
    let i = event.target.id % 9;
    let j = parseInt(event.target.id / 9);
    let segmentX = parseInt(i / 3) * 3;
    let segmentY = parseInt(j / 3) * 3;
    for (let item of board) {
        for (let k = segmentX; k < segmentX + 3; k++) {
            for (let p = segmentY; p < segmentY + 3; p++) {
                if (item.x === k && item.y === p && item === number) {
                    return false;
                }
            }
        }
    }
    return true;
}


function check(event, board, number) {
    if (
        this.checkVertical(event, board, number) &&
        this.checkHorizontal(event, board, number) &&
        this.checkMatrix(event, board, number)
    ) {
        return true;
    } else {
        return false;
    }
}


function possibleNumbers(event, board, number) {
    let init = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let possible = [];
    for (let item of init) {
        if (this.check(event, board, number)) {
            possible.push(item);
        }
    }
    return possible;
}


