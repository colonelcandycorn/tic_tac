/*
Board Class keeps track of which pieces are placed where,
it attempts to place pieces if possible, and it can check
for win conditions
 */
const Board = ()=> {
    let boardArray = [];

    //Private functions
    const isFilled = (index) => {
        return boardArray[index]
    }

    const checkDiagonals = () => {
        if (boardArray[0] && boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8])
            return boardArray[0];
        if (boardArray[2] && boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6])
            return boardArray[2];

        return false;
    }

    const checkHorizontals = () => {
        if (boardArray[0] && boardArray[0] === boardArray[1] && boardArray[0] === boardArray[2]) return boardArray[0];
        if (boardArray[3] && boardArray[3] === boardArray[4] && boardArray[3] === boardArray[5]) return boardArray[3];
        if (boardArray[6] && boardArray[6] === boardArray[7] && boardArray[6] === boardArray[8]) return boardArray[6];

        return false;
    }

    const checkVerticals = () => {
        if (boardArray[0] && boardArray[0] === boardArray[3] && boardArray[0] === boardArray[6]) return boardArray[0];
        if (boardArray[1] && boardArray[1] === boardArray[4] && boardArray[1] === boardArray[7]) return boardArray[1];
        if (boardArray[2] && boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8]) return boardArray[2];

        return false;
    }

    //Public Functions
    const updatePos = (index, char) => {
        if (isFilled(index)) return false;

        boardArray[index] = char;
        console.log(`At index ${index} character, ${char}, was placed`);
        return true;
    }

    const isWinner = () => {
        let horizontals = checkHorizontals();
        let verticals = checkVerticals();
        let diagonals = checkDiagonals();

        if (horizontals) return horizontals;
        if (verticals) return verticals;
        if (diagonals) return diagonals;

        return false;
    }

    const reset = () => {
        boardArray = [];
    }

    return {
        updatePos,
        isWinner,
        reset,
    }
}

/*
Game class runs the whole game by taking an event into playTurn
processing the input and affecting the game state based on the
player's move.
 */

const Game = () => {
    let turn = 'X';
    const board = Board();
    const switchTurn = () => {
        const o = document.querySelector('.x-player');
        const x = document.querySelector('.o-player')

        // toggle which player is highlighter to indicate whose turn it is

        x.classList.toggle('active');
        o.classList.toggle('active');

        // switch the turn internally

        turn = turn === 'X' ? 'O' : 'X';

    }

    const playTurn = (event) => {
        if (!turn) return;
        let index = (+(event.target.closest('div').id[3]) - 1);
        // if the player clicks the wrong place return else update pos
        if (!board.updatePos(index, turn)) {
            console.log("You clicked an incorrect spot");
            return;
        } else {
            event.target.childNodes[0].textContent = turn;
        }

        // check if there is a winner
        let winner = board.isWinner();
        if (winner) {
            turn = false;
            endGame(winner);
            return;
        }
        // there isn't a winner so switch turn
        switchTurn();
    }

    const endGame = (winner) => {
        let boxes = document.querySelectorAll('.box');

        boxes.forEach(box => {
            let child = box.children[0];

            if (child.textContent === winner) {
                child.classList.toggle('active');
            }
        })

        document.querySelector('#winner-text').innerText = "The Winner is"
    }

    const reset = () => {
        board.reset();
        document.querySelector('#winner-text').innerText = "Whose turn is it?"
        turn = 'X';

        let boxes = document.querySelectorAll('.box');

        boxes.forEach(box => {
            let child = box.children[0];

            child.classList.remove('active');
            child.textContent = '';
        })

        document.querySelector('.o-player').classList.remove('active');
        document.querySelector('.x-player').classList.add('active');
    }

    return {
        playTurn,
        reset,
    }
}

const board = document.querySelector('.board');
const reset = document.querySelector('#reset');
const game = Game();
board.addEventListener('click', e => game.playTurn(e));

reset.addEventListener('click', game.reset);