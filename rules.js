
class Rules {

    constructor(boardSize, numPlayers) {
        this.numPlayers = numPlayers
        this.boardSize = boardSize
        this.turn = 0
        this.board = new Map()
    }


    isValidSquare(row, col) {
        return (row >= 0 && row < boardSize) &&
               (col >= 0 && col < boardSize)
    }

    endTurn() {
        turn += 1
        currentPlayer = turn % numPlayers
    }

    cellIsOccupied(boardID, row, col) {
        return this.board.has(boardID+","+row+","+col)
    }

    putOnBoard(boardID, row, col, objectType, direction, size) {

        while (size > 0) {
            this.board.set(IDToString(boardID, row, col), objectType)
            --size
            if (direction == 0) {
                ++col
            } else {
                ++row
            }
        }
    }
}