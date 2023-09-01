let BOARD_SIZE = 10 // Number of cells in a row/column
let cellSize = 35; // Size of each cell in pixels
let BOSS_BOARD_SIZE = 15 // Number of cells in a row/column
let GAME_ALERT_SPEED = 500 // Speed of the game alert in ms

//On game launch a new game board is made.
//this ensures that there is no null board display issues
let remember = -1;
let attack = 0; // are we in the attack phase or not 0 for no and 1 for yes
let gameType = 0    // Single player = 0, Co-op = 1

let currentSelectedTile = null;
let currentHighlightedTiles = [];
let isSingleHighlight = true; // generic is true, ship is false
let hoverSize = 1; // shows the length of a highlight only relevant for bombs and ships
let isVertical = true; // 0 is vertical and 1 is horizontal
let selectedShipNum = 0;
let itemsPlaced = 0;
let numPlayerAttacks = 0;
let numPlayerHits = 0;
let numEnemyAttacks = 0;
let numEnemyHits = 0;
let numDivinePunishments = 0;
let playerAttackedTiles = [];
let isValidPlacementSpot = false;

//These two will hold the virtual board for player and computer.
let virtual_player = [[]];
let virtual_enemy = [[]];
let virtual_player_two = [[]]

let finishedBtns = [];

let playerShipHealth = 0;
let enemyShipHealth = 0;

let playerShips = [];
let enemeyShips = [];
//Points
let enemyPounts = 0;
let playerPoints = 0;
let player2Points = 0;

let turnNumber = 0;
let currentTurn = 1
let firstPlacement = true;

function toggleDirection() {
    isVertical = !isVertical;
    unHighlight();
}

function IDToString(boardID, row, col) {
    return boardID + "," + row + "," + col
}

function convertMeCaptain(cellID) {
    raw = cellID.split(',')
    return [raw[0], parseInt(raw[1]), parseInt(raw[2])]
}

function getBoardID(cellID) {
    return cellID.split(',')[0]
}

function getRow(cellID) {
    return parseInt(cellID.split(',')[1])
}

function getCol(cellID) {
    return parseInt(cellID.split(',')[2])
}


function validCoordinates(cell) {
    let row = getRow(cell.id)
    let col = getCol(cell.id)
    enemy_size = gameType == 0 ? BOARD_SIZE : BOSS_BOARD_SIZE;
    return (row >= 0 && row < enemy_size && col >= 0 && col < enemy_size)
}

function checkEnemyShipPlacement(row, col, dir, size) {
    while (size > 0) {
        if (virtual_enemy[row][col][0] == "E") {
            return false;
        }

        if (dir == 0) {
            ++row
        } else {
            ++col
        }
        --size
    }

    return true;
}

if (typeof module !== 'undefined') {
    module.exports = {
        validCoordinates,
        getBoardID,
        getRow,
        getCol,
        IDToString,
        convertMeCaptain
    }
}