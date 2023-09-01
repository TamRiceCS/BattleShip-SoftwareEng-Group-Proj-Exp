
let guessed = [[]]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function distance(row1, col1, row2, col2) {
    return Math.abs(row2 - row1) + Math.abs(col2 - col1);
}

function makeMove() {
    do {
        row = getRandomInt(BOARD_SIZE)
        col = getRandomInt(BOARD_SIZE)
    } while (guessed.some(l => l[0] == row && l[1] == col))
    guessed.push([row, col])
    return [row, col]
}


function makeCoopMove() {
    do {
        player = (getRandomInt(10) % 2) + 1
        row = getRandomInt(BOARD_SIZE)
        col = getRandomInt(BOARD_SIZE)
    } while (guessed.some(l => l[0] == player && l[1] == row && l[2] == col))

    // console.log("Guess list before enemy move: " + guessed)
    guessed.push([player, row, col])
    // console.log("Guess list after enemy move: " + guessed)
    return [player, row, col]
}

if (typeof module !== 'undefined')
    module.exports = makeMove;