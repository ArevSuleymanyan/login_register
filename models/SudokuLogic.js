class SudokuLogic {
    constructor() {
        this.resetData();
    }

    resetData() {
        this.board = [];
        for (let i = 0; i < 81; i++) {
            let x = i % 9;
            let y = parseInt(i / 9);
            this.board.push({
                x,
                y,
                number: 0,
            });
        }
    }

    runGame(lvl = 3) {
        this.getNumberByLevel(lvl);
    }

    updateBoard(input, i, j) {
        let index = j * 9 + i;
        if (this.check(input, i, j)) {
            this.board[index].number = input;
        }
    }

    checkEndGame() {
        for (let item of this.board) {
            if (!item.number) {
                return true;
            }
        }
        return false;
    }

    getNumberByLevel(level) {
        let countOfNumbers;
        if (level === 3) {
            countOfNumbers = 75;
            this.generateNumber();
        } else if (level === 2) {
            countOfNumbers = 30;
            this.generateNumber();
        } else if (level === 1) {
            countOfNumbers = 25;
            this.generateNumber();
        }

        while (countOfNumbers < 81) {
            let randomIndex = Math.floor(Math.random() * 81);
            if (this.board[randomIndex].number) {
                this.board[randomIndex].number = 0;
                countOfNumbers++;
            }
        }
    }

    possibleNumbers(index) {
        let init = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let possible = [];
        for (let item of init) {
            if (this.check(item, this.board[index].x, this.board[index].y)) {
                possible.push(item);
            }
        }
        return possible;
    }

    generateNumber(attempts) {
        if (!attempts) {
            attempts = 2000;
        }
        this.resetData();
        for (let i = 0; i < 81; i++) {
            let possible = this.possibleNumbers(i);
            if (!possible.length) {
                this.resetData();
                i = -1;
                attempts--;
                if (attempts == 0) {
                    throw 'Cant generate';
                }
                continue;
            }
            let rnd = Math.floor(Math.random() * possible.length);
            this.board[i].number = possible[rnd];
            //this.print()
        }
    }

    check(number, i, j) {
        if (
            this.checkVertical(number, i) &&
            this.checkHorizontal(number, j) &&
            this.checkMatrix(number, i, j)
        ) {
            return true;
        } else {
            return false;
        }
    }

    checkVertical(number, i) {
        for (let item of this.board) {
            if (item.x === i && item.number === number) {
                return false;
            }
        }
        return true;
    }

    checkHorizontal(number, j) {
        for (let item of this.board) {
            if (item.y === j && item.number === number) {
                return false;
            }
        }
        return true;
    }

    checkMatrix(number, i, j) {
        let segmentX = parseInt(i / 3) * 3;
        let segmentY = parseInt(j / 3) * 3;
        for (let item of this.board) {
            for (let k = segmentX; k < segmentX + 3; k++) {
                for (let p = segmentY; p < segmentY + 3; p++) {
                    if (
                        item.x === k &&
                        item.y === p &&
                        item.number === number
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    print() {
        let res = '';
        for (let i = 0; i < 81; i++) {
            const item = this.board[i];
            if (i % 9 === 0) {
                res += '\n';
            }
            res += item.number.toString();
        }
        console.log(res);
    }
}

module.exports = SudokuLogic;
