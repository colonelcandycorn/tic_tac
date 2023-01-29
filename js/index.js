const Board = ()=> {
    let boardArray = ['x','x','',
                      'x', 'x', '',
                      '', '', ''];

    //Private functions
    const isFilled = (index) => {
        return !boardArray[index]
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

    return {
        updatePos,
        isWinner
    }
}

let board = Board();

console.log(board.isWinner());