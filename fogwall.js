
// BEYOND HERE IS FOG...

// 2D array of fog objects that each keep track of their neighbors
let fogWall = [];
for (let i = 0; i < BOSS_BOARD_SIZE; i++) {
    fogWall.push([]);
}

// Fog Object
class Fog {
    constructor() {
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
    }

    setNorth(fog) {
        this.north = fog;
    }
    setEast(fog) {
        this.east = fog;
    }
    setSouth(fog) {
        this.south = fog;
    }
    setWest(fog) {
        this.west = fog;
    }
    removeNorth() {
        this.north = null;
    }
    removeEast() {
        this.east = null;
    }
    removeSouth() {
        this.south = null;
    }
    removeWest() {
        this.west = null;
    }

    getFogType() {
        var fogID = 0;
        if (this.north != null) {
            fogID += 1000;
        }
        if (this.east != null) {
            fogID += 100;
        }
        if (this.south != null) {
            fogID += 10;
        }
        if (this.west != null) {
            fogID += 1;
        }

        switch (fogID) { // Returns the correct image file and rotation for the fog
            case 1111: // NESW
                return ["Fog_Zero_Edge.png", 0];
            case 1110: // NES_
                return ["Fog_1_Edge.png", 270];
            case 1101: // NE_W
                return ["Fog_1_Edge.png", 180];
            case 1100: // NE__
                return ["Fog_Corner_Edge.png", 180];
            case 1011: // N_SW
                return ["Fog_1_Edge.png", 90];
            case 1010: // N_S_
                return ["Fog_2_Edge.png", 90];
            case 1001: // N__W
                return ["Fog_Corner_Edge.png", 90];
            case 1000: // N___
                return ["Fog_3_Edge.png", 90];
            case 111: // _ESW
                return ["Fog_1_Edge.png", 0];
            case 110: // _ES_
                return ["Fog_Corner_Edge.png", 270];
            case 101: // _E_W
                return ["Fog_2_Edge.png", 0];
            case 100: // _E__
                return ["Fog_3_Edge.png", 180];
            case 11: // __SW
                return ["Fog_Corner_Edge.png", 0];
            case 10: // __S_
                return ["Fog_3_Edge.png", 270];
            case 1: // ___W
                return ["Fog_3_Edge.png", 0];
            case 0: // ____
                return ["Fog_4_Edge.png", 0];
            default:
                return ["fog_evil.png", 0];
        }
    }
}

function connectFogWall() {
    for (let row = 0; row < BOSS_BOARD_SIZE; row++) {
        for (let col = 0; col < BOSS_BOARD_SIZE; col++) {
            if (row > 0) {
                fogWall[row][col].setNorth(fogWall[row - 1][col]);
            }
            if (row < BOSS_BOARD_SIZE - 1) {
                fogWall[row][col].setSouth(fogWall[row + 1][col]);
            }
            if (col > 0) {
                fogWall[row][col].setWest(fogWall[row][col - 1]);
            }
            if (col < BOSS_BOARD_SIZE - 1) {
                fogWall[row][col].setEast(fogWall[row][col + 1]);
            }
        }
    }
}

function initializeFogOfWar() {
    // Add fog layer to each cell and itialize fogWall with Fog objects
    for (var row = 0; row < BOSS_BOARD_SIZE; row++) {
        for (var col = 0; col < BOSS_BOARD_SIZE; col++) {
            var cell = document.getElementById("E," + row + "," + col);
            var fogLayer = document.createElement("img");
            fogLayer.classList.add("fog");
            cell.appendChild(fogLayer);
            fogWall[row][col] = new Fog();
        }
    }

    connectFogWall();

    // Now tell them to set their src images
    for (let row = 0; row < BOSS_BOARD_SIZE; row++) {
        for (let col = 0; col < BOSS_BOARD_SIZE; col++) {
            if (col < BOSS_BOARD_SIZE && row < BOSS_BOARD_SIZE && col >= 0 && row >= 0) {
                var fogInfo = fogWall[row][col].getFogType();
                var fogType = fogInfo[0];
                var fogRotation = fogInfo[1];
                var fogLayer = document.getElementById("E," + row + "," + col).getElementsByClassName("fog")[0];
                fogLayer.src = "resources/" + fogType;
                fogLayer.setAttribute("style", "transform: rotate(" + fogRotation + "deg);");
                fogLayer.width = cellSize;
                fogLayer.height = cellSize;
            }
        }
    }
}

function removeFogTile(cell) {
    let fog = cell.getElementsByClassName("fog")[0];
    if (fog == null) {
        return;
    }
    cell.removeChild(fog);

    // Now that fog has been removed on this tile, we must tell adjacent tiles they now have one less neighbor
    let row = getRow(cell.id);
    let col = getCol(cell.id);

    leftTile = document.getElementById("E," + row + "," + (col - 1));
    topTile = document.getElementById("E," + (row - 1) + "," + col);
    rightTile = document.getElementById("E," + row + "," + (col + 1));
    bottomTile = document.getElementById("E," + (row + 1) + "," + col);

    var neighbors = [];
    if (leftTile != null) {
        neighbors.push(leftTile);
    }
    if (topTile != null) {
        neighbors.push(topTile);
    }
    if (rightTile != null) {
        neighbors.push(rightTile);
    }
    if (bottomTile != null) {
        neighbors.push(bottomTile);
    }

    for (neighborTile of neighbors) {
        let neighborFog = neighborTile.getElementsByClassName("fog")[0];
        if (neighborFog != null) {
            // The tile did in fact have fog, so we must tell it that it now has one less neighbor
            neighborRow = getRow(neighborTile.id);
            neighborCol = getCol(neighborTile.id);

            switch (neighborTile) {
                case leftTile:
                    fogWall[neighborRow][neighborCol].removeEast();
                    break;
                case topTile:
                    fogWall[neighborRow][neighborCol].removeSouth();
                    break;
                case rightTile:
                    fogWall[neighborRow][neighborCol].removeWest();
                    break;
                case bottomTile:
                    fogWall[neighborRow][neighborCol].removeNorth();
                    break;
            }

            //Now update the fog image
            var fogInfo = fogWall[neighborRow][neighborCol].getFogType();
            var fogType = fogInfo[0];
            var rotation = fogInfo[1];
            neighborFog.setAttribute("style", "transform: rotate(" + rotation + "deg);");
            neighborFog.src = "resources/" + fogType;
        }
    }
}