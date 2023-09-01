window.onkeydown = function (e) {
    if (e.code === 'KeyA') {
        // Check if a tile is currently selected and if finbtn text is attack, then attack
        if (currentSelectedTile != null && document.getElementById("finBtn").innerText === "Attack") {
            attackSquare(currentSelectedTile);
        }
    } else if (e.code === 'KeyR') {
        toggleDirection();
    }
}

window.onload = function () {
    // console.log("On load functionality");

    //removing the island background if there and then displaying ship
    let backgroundImage = document.getElementById("backgroundImage");
    backgroundImage.classList.remove("gameBoard");
    backgroundImage.classList.add("title-image");

};

//Code that handles start being clicked
function playerOptions() {
    console.log("Clicked start game");
    changeDisplay("start", false);
    changeDisplay("options", true);
}

//Code that will actually launch the game
function startGame() {
    BOSS_BOARD_SIZE = 10
    createVirtualBoard()
    placeVirtualShips()
    //Changing the background to island 
    let backgroundImage = document.getElementById("backgroundImage");
    backgroundImage.classList.remove("title-image");
    backgroundImage.classList.add("gameBoard");

    //Updating game title
    setTimeout(function () {
        document.getElementById("title-feedback").innerText = "Place \nShips!!";
    }, 3000);



    console.log("Clicked a game mode");
    changeDisplay("options", false);
    changeDisplay("mainRow", true);

    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "enemyBoard", "E");
    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "playerBoard", "P");

}

function startCoopGame() {
    gameType = 1
    BOSS_BOARD_SIZE = 15
    createVirtualBoard()
    placeVirtualShips()
    //Changing the background to island 
    let backgroundImage = document.getElementById("backgroundImage");
    backgroundImage.classList.remove("title-image");
    backgroundImage.classList.add("gameBoard");



    //Updating game title
    setTimeout(function () {
        document.getElementById("title-feedback").innerText = "Place \nShips!!";
    }, 3000);

    console.log("Clicked a game mode");
    changeDisplay("options", false);
    changeDisplay("mainRow", true);

    createGuiBoard(BOSS_BOARD_SIZE, BOSS_BOARD_SIZE, "enemyBoard", "E");
    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "playerBoard1", "P1");
    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "playerBoard2", "P2");

}

// reset game (front-end and back-end)
function again() {
    $("enemyBoard").remove()
    $("playerBoard").remove()
    enemyShipHealth = 0
    playerShipHealth = 0
    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "enemyBoard", "E")
    createGuiBoard(BOARD_SIZE, BOARD_SIZE, "playerBoard", "P")
    createVirtualBoard()
    placeVirtualShips()
}

function back2Home() {

    window.location.assign("index.html");
    again();
    changeDisplay("over", false);
    playerOptions();
}

//Code that toggles HTML elements from being hidden or shown
function changeDisplay(id, toggle) {
    let elem = document.getElementById(id);
    let display = toggle ? "block" : "none";
    elem.style.display = display;
}

// Handles cases of place ship button being pressed
function report(length, btnNum) {
    // console.log("Button Clicked");
    changeHighlightSize(length, btnNum);
    // console.log("sh" + btnNum);

    // Check if the btn press is a repeated one
    if (btnNum == remember) {
        document.getElementById("sh" + btnNum).style.backgroundColor = "White";
        remember = -1;
    }

    // a different button has been pressed
    else {
        // alert("Press 'R' to change ship orientation; quick exit use spacebar or enter key.");
        document.getElementById("sh" + btnNum).style.backgroundColor = "LightBlue";

        if (remember != -1) {
            document.getElementById("sh" + remember).style.backgroundColor = "White";
        }

        remember = btnNum;
    }
}

// change board once more so we can enter the play loop
function placeDone() {
    if (gameType == 1 && firstPlacement) {
        firstPlacement = false
        document.getElementById("sh1").disabled = false;
        document.getElementById("sh2").disabled = false;
        document.getElementById("sh3").disabled = false;
        document.getElementById("sh4").disabled = false;
        document.getElementById("sh5").disabled = false;
        console.log(virtual_player);
        return;
    } else if (gameType == 1 && !firstPlacement) {
        console.log(virtual_player_two);
    } else {
        console.log(virtual_player);
    }

    //Indicating first time that player is up
    document.getElementById("title-feedback").classList.add("player-highlight");
    if (gameType == 0) {
        document.getElementById("title-feedback").innerText = "Player \nTurn!!";
    } else {
        document.getElementById("title-feedback").innerText = "Player " + currentTurn + "\nTurn!!";
    }

    if (getItemsPlaced() >= 5 && attack == 0) {

        // Enemy Stats
        document.getElementById("title1").innerHTML = "Enemy Stats";
        document.getElementById("sh1").innerHTML = "Score: 0";
        document.getElementById("sh2").innerHTML = "Traps n' Treasures: 0";
        document.getElementById("sh3").innerHTML = "Ships Sank: 0";
        document.getElementById("sh4").innerHTML = "Unsunk Ships: 5";
        document.getElementById("sh5").innerHTML = "Turn: No";

        //Player Stats
        document.getElementById("title2").innerHTML = "Player Stats";
        document.getElementById("mine1").innerHTML = "Score: 0";
        document.getElementById("mine2").innerHTML = "Traps n' Treasures: 0";
        document.getElementById("mine3").innerHTML = "Ships Sank: 0";
        document.getElementById("mine4").innerHTML = "Unsunk Ships: 5";
        document.getElementById("mine5").innerHTML = "Turn: Yes";

        //Disabling both stats
        for (let i = 1; i < 6; i++) {

            //Disabling click and reassigning onClick from 'Report" function to an empty function
            document.getElementById("sh" + i).disabled = false;
            document.getElementById("sh" + i).onclick = function () { };

            //Disabling click for player stats as well
            document.getElementById("mine" + i).disabled = false;
            document.getElementById("mine" + i).addEventListener("click", e => {
                e.preventDefault()
            });

            document.getElementById("sh" + i).style.backgroundColor = "White";
        }

        //Attaching the attack functionality
        document.getElementById("finBtn").innerHTML = "Attack";
        document.getElementById("finBtn").onclick = function () {
            attackSquare(currentSelectedTile);
        };

        initializeFogOfWar();

        attack = 1;
    }

}

function tempAlert(msg, duration) {
    let height = 100;
    let width = 300;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var w = window.open('', '', 'resizable = yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    // if(msg == "HIT!") {
    //     w.document.write('<h3 style="text-align: center;">HIT!</h3>')
    // }
    // else {
    //     w.document.write('<h3 style="text-align: center;">Miss!</h3>')
    // }
    w.document.write('<h3 style="text-align: center;"> ' + msg + '</h3>')
    w.focus()
    setTimeout(function () { w.close(); }, duration)
}
function isInvalidAttack() {
    if (currentSelectedTile == null || currentSelectedTile.id[0] != "E") {
        return true;
    }
    if (playerAttackedTiles.includes(currentSelectedTile.id)) {
        if (currentSelectedTile.getElementsByClassName("totem")[0] != null) {
            return false; // We want to allow the player to attack the totem repeatedly
        }
        return true;
    }
    playerAttackedTiles.push(currentSelectedTile.id);
    return false;
}
function attackSquare() {
    document.getElementById("mine5").innerHTML = "Turn: No";
    document.getElementById("sh5").innerHTML = "Turn: Yes";


    //Player attacks tile where it checks if on enemy board and tile is not boarder
    //Also if the above is true then it will displaay splash or piece of a broken ship
    if (isInvalidAttack()) {
        return;
    }
    currentTurn = (currentTurn == 2) ? 1 : 2;
    checkIfPlayerHitEnemy(currentSelectedTile)

    //Title changes to indicate that it is players turn 
    setTimeout(function () {
        document.getElementById("title-feedback").classList.remove("enemy-highlight");
        document.getElementById("title-feedback").classList.add("player-highlight");
        if (gameType == 0) {
            document.getElementById("title-feedback").innerText = "Player\nTurn!!";
        } else {
            document.getElementById("title-feedback").innerText = "Player " + currentTurn + "\nTurn!!";
        }
    }, 3000);
    unselect(); // Reset the current selected tile

    // Now Enemy Selects their target
    var cell
    var boardMark
    if (gameType == 0) {
        enemyGuess = makeMove()
        cell = document.getElementById("P," + enemyGuess[0] + "," + enemyGuess[1])
        boardMark = virtual_player[enemyGuess[0]][enemyGuess[1]];
    } else {
        enemyGuess = makeCoopMove()
        // console.log("Enemy Guess is " + enemyGuess[0] + "," + enemyGuess[1] + "," + enemyGuess[2])
        if (enemyGuess[0] == 1) {
            cell = document.getElementById("P" + enemyGuess[0] + "," + enemyGuess[1] + "," + enemyGuess[2])
            boardMark = virtual_player[enemyGuess[1]][enemyGuess[2]];
        } else {
            cell = document.getElementById("P" + enemyGuess[0] + "," + enemyGuess[1] + "," + enemyGuess[2])
            boardMark = virtual_player_two[enemyGuess[1]][enemyGuess[2]];
        }
    }
    // With their target now selected, the enemy attacks
    console.log("ENEMY ATTACKING " + cell.id)
    numEnemyAttacks += 1;
    setTimeout(function () {
        //Highlight to indicate that it is enemy turn
        document.getElementById("title-feedback").classList.remove("player-highlight");
        document.getElementById("title-feedback").classList.add("enemy-highlight");
        // Check if enemy hit or missed
        if (boardMark[0] == "S") {
            //Updating game title
            document.getElementById("title-feedback").innerText = "Enemy \nHas Hit!";
            // Enemy attacks player
            numEnemyHits += 1;
            playerShipHealth -= 1;
            breakShipTile(cell, boardMark);
            checkWin();
        } else {
            document.getElementById("title-feedback").innerText = "Enemy \nHas Missed!";
            console.log("Enemy has missed!")
            splash(cell);
        }
        document.getElementById("sh5").innerHTML = "Turn: No";

        document.getElementById("mine5").innerHTML = "Turn: Yes";

    }, GAME_ALERT_SPEED)
}

function checkIfPlayerHitEnemy(cell) {
    numPlayerAttacks += 1;
    removeFogTile(cell);
    // Get location of attack
    let row = getRow(cell.id);
    let col = getCol(cell.id);
    console.log("Attacking cell " + row + " " + col);
    let attackSpot = virtual_enemy[row][col];
    //Tile on enemy board changes to a piece of broken ship when hit 
    if (attackSpot[0] == "E") {
        console.log("You hit an enemy ship!");
        hit(row, col, playerShips);
        checkSunk(playerShips);
        //Updating stats for player
        numPlayerHits += 1;
        playerPoints += 50;
        document.getElementById("mine1").innerHTML = "Score: " + playerPoints;
        enemyShipHealth -= 1;
        // Break the ship tile
        breakShipTile(cell, attackSpot, true);
        // Now that the enemy has been hit, check if they have lost
        checkWin();
    }
    //Punishment power up
    else if (attackSpot[0] == "T") {
        console.log("You hit a totem!");
        totemShowSelf(cell);
        totemPunishPlayer();
        checkWin();
    }
    //Tile on enemy board changes to splash when missed
    else {
        console.log("You missed!")
        splash(cell);
    }
}

// Show the totem now that it has been struck!
function totemShowSelf(cell) {
    // Create new totem image to plae on the cell
    let totem = document.createElement("img");
    totem.src = "resources/Totem.png";
    totem.height = cellSize;
    totem.width = cellSize;
    totem.classList.add("totem");
    cell.appendChild(totem);
}

// Punish the player for hitting a totem
function totemPunishPlayer() {
    while (true) {// Pick a random ship tile from the player's board
        let row = Math.floor(Math.random() * BOARD_SIZE);
        let col = Math.floor(Math.random() * BOARD_SIZE);
        if (gameType == 0) {
            // If the cell is a ship tile, attack it
            if (virtual_player[row][col][0] == "S") {
                guessed.push([row, col]);
                let cell = document.getElementById("P," + row + "," + col);
                numDivinePunishments += 1;
                playerShipHealth -= 1;
                breakShipTile(cell, virtual_player[row][col])
                break;
            }
        } else {
            // Randomly pick a player to attack and find a random ship tile
            let player = Math.floor(Math.random() * 2) + 1;
            let virtual_victim = player == 2 ? virtual_player_two : virtual_player;
            let victim = player == 2 ? "P2" : "P1";
            if (virtual_victim[row][col][0] == "S") {
                guessed.push([player, row, col]);
                let cell = document.getElementById(victim + "," + row + "," + col);
                numDivinePunishments += 1;
                playerShipHealth -= 1;
                breakShipTile(cell, virtual_victim[row][col])
                break;
            }
        }
    }
}

// The enemy has hit one of the player's ship tile, change it to the broken ship tile image
function breakShipTile(cell, boardMark, isEnemyBeingAttacked = false) {
    //Determine this tile's ship tile type and orientation based on the boardMark
    let shipTileType = boardMark[1];
    let shipTile;
    let color = [0, 0, 1]; // blue
    let virtual_victim = virtual_player;
    if (isEnemyBeingAttacked) {
        // Enemy ship was hidden so their tile wont have a ship image, so we need to create one
        shipTile = document.createElement("img");
        shipTile.classList.add("ship");
        shipTile.height = cellSize;
        shipTile.width = cellSize;
        cell.appendChild(shipTile);
        color = [1, 0, 0]; // red
        virtual_victim = virtual_enemy;
        //Get the orientation
        let orientation = boardMark[2];
        let degree = orientation == "N" ? 0 : orientation == "E" ? 90 : orientation == "S" ? 180 : 270;
        shipTile.style.transform = "rotate(" + degree + "deg)";
    } else {
        shipTile = cell.getElementsByClassName("ship")[0];
    }
    switch (shipTileType) {
        case "T":
            // This is the top of a ship, replace old ship image
            shipTile.src = "resources/New_Ship_Top_Destroyed.png";
            break;
        case "M":
            // This is the middle of a ship, replace old ship image
            shipTile.src = "resources/New_Ship_Mid_Destroyed.png";
            break;
        case "B":
            // This is the bottom of a ship, replace old ship image
            shipTile.src = "resources/New_Ship_Btm_Destroyed.png";
            break;
    }
    if (gameType == 1 && !isEnemyBeingAttacked) {
        // If this is a multiplayer game, change the color of the ship tile to the color of the player who was attacked
        let team = getBoardID(cell.id);
        color = team == "P2" ? [0, 1, 0] : [0, 0, 1];
        virtual_victim = team == "P2" ? virtual_player_two : virtual_player;
    }
    colorizeShip(shipTile, color);
    // Also change the S on the virtual board to a D, so that the player can't hit the same tile twice
    virtual_victim[getRow(cell.id)][getCol(cell.id)] = "D" + virtual_victim[getRow(cell.id)][getCol(cell.id)].substring(1);
}

function splash(cell) {
    // Create new splash image to place on the cell
    let splash = document.createElement("img");
    splash.src = "resources/Splash.png";
    splash.height = cellSize;
    splash.width = cellSize;
    splash.classList.add("splash");
    cell.appendChild(splash);
}

// Add a new image to a given cell
function addImageToTile(cell, imageName, className) {
    var img = document.createElement("img");
    img.setAttribute("draggable", "false");
    img.classList.add(className);
    img.src = "resources/" + imageName + ".png";
    img.height = cellSize;
    img.width = cellSize;
    cell.appendChild(img);
}

// Check if anyone has won the game
function checkWin() {
    //Check if the game is over and who won 
    if (enemyShipHealth == 0 || playerShipHealth == 0) {
        let message = "You Lose X(";
        if (enemyShipHealth == 0) {
            message = "You Win!";
        }
        //Updating stats
        document.getElementById("stats").innerHTML = message + `
        <h1>Player Hits: ` + numPlayerHits +
            `<br>
        Player Accuracy: ` + Math.round((numPlayerHits / numPlayerAttacks) * 100) +
            `%<br>
        Enemy Hits: ` + numEnemyHits +
            `<br>
        Enemy Accuracy: ` + Math.round((numEnemyHits / numEnemyAttacks) * 100) +
            `%<br>
        Divine Punishments: ` + numDivinePunishments +
            `</h1>`

        //Change to Win/Lose page
        changeDisplay("over", true);
        changeDisplay("mainRow", false);
    }
}