function placementValid(cell) {

  let row = getRow(cell.id);
  let col = getCol(cell.id);
  let virtual_fella = getBoardID(cell.id) == "P2" ? virtual_player_two : virtual_player;

  if (!validCoordinates(cell)) {
    return false;
  }

  if (isVertical) {
    if (row + hoverSize - 1 >= BOARD_SIZE) {
      return false;
    }

    for (let i = 0; i < hoverSize; ++i) {
      if (virtual_fella[row + i][col][0] != "-") {
        return false;
      }
    }
  } else {
    if (col + hoverSize - 1 >= BOARD_SIZE) {
      return false;
    }
    for (let i = 0; i < hoverSize; ++i) {
      if (virtual_fella[row][col + i][0] != "-") {
        return false;
      }
    }
  }
  return true
}

function shipValidity(row, col) {
  // Only checks wrong vertical placements
  if (row + hoverSize - 1 > BOARD_SIZE) {
    // console.log("!!! UNSAFE TILE");
    return false;
  }

  // Checks that board pos empty
  for (let i = 0; i < hoverSize; i++) {
    if (virtual_player[row + i][col][0] != "-") {
      // console.log("!!! UNSAFE TILE");
      return false;
    }
  }

  // no false cases triggered

  // console.log("*** SAFE TILE");
  return true;
}


/************* FUNCTIONS BELOW ONLY *************/

//Creates a virtual board with dimensions
function createVirtualBoard() {
  // creating two dimensional array
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      virtual_player[i] = [];
      virtual_player_two[i] = [];
    }
  }

  // inserting elements to array
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      virtual_player[i][j] = "--";
      virtual_player_two[i][j] = "--";
    }
  }

  let enemyBoardSize = (gameType == 0) ? BOARD_SIZE : BOSS_BOARD_SIZE


  for (let i = 0; i < enemyBoardSize; i++) {
    for (let j = 0; j < enemyBoardSize; j++) {
      virtual_enemy[i] = [];
    }
  }

  for (let i = 0; i < enemyBoardSize; i++) {
    for (let j = 0; j < enemyBoardSize; j++) {
      virtual_enemy[i][j] = "---";
    }
  }
}

//Places the ships onto the 2D array for the enemy board ONLY
function placeVirtualShips() {
  let placement = 1;
  enemy_size = (gameType == 0) ? BOARD_SIZE : BOSS_BOARD_SIZE;

  //Loops to check position from random numbers to match row col form. Makes sure 5 ships are placed then breaks
  while (placement != 6) {
    let row = Math.floor(Math.random() * enemy_size);
    let col = Math.floor(Math.random() * enemy_size);
    //holding T or F value of random position on the board
    let position = checkPlacement(row, col);
    //Placing the ships on board each iteration ONLY IF position is true
    if (position == true) {
      switch (placement) {
        case 1: placeVirtualShip(row, col, 2); break;
        case 2: placeVirtualShip(row, col, 3); break;
        case 3: placeVirtualShip(row, col, 3); break;
        case 4: placeVirtualShip(row, col, 4); break;
        case 5: placeVirtualShip(row, col, 5); break;
      }
      placement++;  //Each increment means a ship has been placed
    }
  }
  placeEnemyTotem();
  console.log(virtual_enemy)
}

//Function that will check if putting a ship from bottom to top is valid and if it is valid then it will set it on the board
function rotate_up(row, col, cells) {
  // console.log("Checking Placement of ship_" + cells + " Row is: " + row + ", Col is: " + col);    

  //Condition to check if we can place above and is in bounds of array
  for (let i = 0; i < cells; i++) {
    if (checkPlacement(row - i, col) == false) {  //CheckPlacement function checks bounds and if ship is there 
      // console.log("Ship " + cells + " FAILED!");
      return false; //No Placement is done breaks out of function
    }
  }
  // console.log("Ship " + cells + " placed!");
  return true;

}

//Function that will check if putting a ship from left to right is valid and if it is valid then it will set it on the board
function rotate_right(row, col, cells) {
  // console.log("Checking Placement of ship_" + cells + " Row is: " + row + ", Col is: " + col);

  //Condition to check if we can place above and is in bounds of array
  for (let i = 0; i < cells; i++) {
    if (checkPlacement(row, col + i) == false) {
      // console.log("Ship " + cells + " FAILED!");
      return false; //No Placement is done breaks out of function
    }
  }
  // console.log("Ship " + cells + " placed!");
  return true;
}

//Function that will check if putting a ship from top to bottom is valid and if it is valid then it will set it on the board
function rotate_down(row, col, cells) {
  // console.log("Checking Placement of ship_" + cells + " Row is: " + row + ", Col is: " + col);

  //Condition to check if we can place above and is in bounds of array
  for (let i = 0; i < cells; i++) {
    if (checkPlacement(row + i, col) == false) {
      // console.log("Ship " + cells + " FAILED!");
      return false; //No Placement is done breaks out of function
    }
  }
  // console.log("Ship " + cells + " placed!");
  return true;

}

//Function that will check if putting a ship from right to left is valid and if it is valid then it will set it on the board
function rotate_left(row, col, cells) {
  // console.log("Checking Placement of ship_" + cells + " Row is: " + row + ", Col is: " + col);

  //Condition to check if we can place above and is in bounds of array
  for (let i = 0; i < cells; i++) {
    if (checkPlacement(row, col - i) == false) {
      // console.log("Ship " + cells + " FAILED!");
      return false; //No Placement is done breaks out of function
    }
  }
  // console.log("Ship " + cells + " placed!");
  return true;
}

//Function that will choose the DIRECTION FIRST then call other rotate function to put in the board
function placeVirtualShip(row, col, ship) {
  // Add ship length to enemy health
  enemyShipHealth += ship;

  //Holding which roataions are possible
  let up = rotate_up(row, col, ship);
  let right = rotate_right(row, col, ship);
  let down = rotate_down(row, col, ship);
  let left = rotate_left(row, col, ship)

  while (true) {
    // Holding the direction of roatating clockwise
    let dir = Math.floor((Math.random() * 4) + 1);
    let temp = new Ship();
    // console.log("ship_" + ship + " direction is " + dir);

    //Rotate Up
    if (dir == 1 && up == true) {
      //Condition if possible to put above then we set it in the array with "E"
      for (let i = 0; i < ship; i++) {
        var shipTileType = i == 0 ? "B" : i == ship - 1 ? "T" : "M";
        virtual_enemy[row - i][col] = "E" + shipTileType + "N"; // N is for North
        temp.col = col;
        temp.position.push(row - i);
      }
      temp.ship_health = temp.position.length;
      playerShips.push(temp);

      break;
    }

    //Rotate Right
    else if (dir == 2 && right == true) {
      //Condition if possible to put above then we set it in the array with "E"
      for (let i = 0; i < ship; i++) {
        var shipTileType = i == 0 ? "B" : i == ship - 1 ? "T" : "M";
        virtual_enemy[row][col + i] = "E" + shipTileType + "E"; // E is for East
        temp.row = row;
        temp.position.push(col + i);
      }
      temp.ship_health = temp.position.length;
      playerShips.push(temp);


      break;
    }

    //Rotate Down
    else if (dir == 3 && down == true) {
      //Condition if possible to put above then we set it in the array with "E"
      for (let i = 0; i < ship; i++) {
        var shipTileType = i == 0 ? "B" : i == ship - 1 ? "T" : "M";
        virtual_enemy[row + i][col] = "E" + shipTileType + "S"; // S is for South
        temp.col = col;
        temp.position.push(row + i);
      }
      temp.ship_health = temp.position.length;
      playerShips.push(temp);
      break;
    }

    //Rotate Left
    else if (dir == 4 && left == true) {
      //Condition if possible to put above then we set it in the array with "E"  
      for (let i = 0; i < ship; i++) {
        var shipTileType = i == 0 ? "B" : i == ship - 1 ? "T" : "M";
        virtual_enemy[row][col - i] = "E" + shipTileType + "W"; // W is for West
        temp.row = row;
        temp.position.push(col - i);
      }
      temp.ship_health = temp.position.length;
      playerShips.push(temp);
      break;
    }

    //Worst case position is in "crowded area". Getting a new position and start again.
    else if (up == false && right == false && down == false && left == false) {
      console.log("New Position--- Checking Placement of ship_" + ship + " Row is: " + row + ", Col is: " + col);

      //New position
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);

      //Updating if roatations are possible on the NEW position
      up = rotate_up(row, col, ship);
      right = rotate_right(row, col, ship);
      down = rotate_down(row, col, ship);
      left = rotate_left(row, col, ship)
    }
  }
  // console.log(playerShips);

}

//Function to check virtual index to make sure position is free to place or not
function checkPlacement(row, col) {
  //Check if the row and col are in bounds
  if ((row > 0 && row < virtual_enemy.length) && (col > 0 && col < virtual_enemy.length)) {
    let isFree = virtual_enemy[row][col]; //Holding the value at enemey board
    if (isFree[0] == "-")  // '-' means that it is free. 'E' means ship is there 
      return true;
    else
      return false;
  }
  else
    return false; //Not in bounds
}

function createGuiBoard(row, col, tag, id) {

  var ourTable = document.createElement("table");
  ourTable.id = tag;
  //row
  for (var i = 0; i < row + 2; i++) {
    var tableRow = document.createElement("tr");
    //column
    for (var j = 0; j < col + 2; j++) {
      var cell = document.createElement("td");
      cell.id = id + "," + (i - 1) + "," + (j - 1);
      cell.style.backgroundColor = (i + j) % 2 == 0 ? "darkred" : "white";
      cell.style.height = `${cellSize}px`;
      cell.style.width = `${cellSize}px`;
      if (
        (i == 0 && j == 0) ||
        (i == 0 && j == col + 1) ||
        (i == row + 1 && j == 0) ||
        (i == row + 1 && j == col + 1)
      ) {
        cell.appendChild(document.createTextNode("⚓️"));
      } else if (i == 0 || i == row + 1) {
        cell.appendChild(document.createTextNode(j));
      } else if (j == 0 || j == col + 1) {
        cell.appendChild(document.createTextNode(String.fromCharCode(64 + i)));
      } else {
        addImageToTile(cell, "Ocean_Tile_V2", "oceanImg");
        cell.onclick = this.tileClicked;
        cell.onmouseenter = this.highlight;
        cell.onmouseleave = this.unHighlight;
      }
      tableRow.appendChild(cell); // add cell to row
    }
    ourTable.appendChild(tableRow); // add row to table
  }
  $("#boards").append(ourTable); // add table to div

  if (id == "P1") {
    ourTable.style.cssFloat = "right";
    ourTable.style.display = "inline-block";
  }

  if (id == "P2") {
    ourTable.style.cssFloat = "left";
    ourTable.style.display = "inline-block";
  }

}

// return how many items are placed
function getItemsPlaced() {
  return itemsPlaced;
}

// Place trap item Totem on the enemy's board
function placeEnemyTotem() {
  while (true) {
    row = Math.floor(Math.random() * BOARD_SIZE);
    col = Math.floor(Math.random() * BOARD_SIZE);
    // Check if the position is free
    if (checkPlacement(row, col)) {
      virtual_enemy[row][col] = "TRP";
      break;
    }
  }

}
if (typeof module !== "undefined")
  module.exports = createVirtualBoard;