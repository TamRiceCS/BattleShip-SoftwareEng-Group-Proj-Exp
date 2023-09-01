function placeGuiShip(callerCell) {
    //Remove the highlight images from the cells first
    unHighlight();
    let teamColor = getBoardID(callerCell.id) == "P2" ? [0, 1, 0] : [0, 0, 1];
    for (let i = 0; i < hoverSize; i++) {
        var newShipTileImg = document.createElement("img");
        // Get the cell we're placing the current ship piece on
        var cell;
        if (isVertical) {
            cell = document.getElementById(getBoardID(callerCell.id) + "," + (getRow(callerCell.id) + i) + "," + getCol(callerCell.id));
        } else {
            cell = document.getElementById(getBoardID(callerCell.id) + "," + getRow(callerCell.id) + "," + (getCol(callerCell.id) + i));
            newShipTileImg.setAttribute("style", "transform:rotate(270deg);");
        }
        // Now add the ship image to the cell
        var shipTileType = i == 0 ? "T" : i == hoverSize - 1 ? "B" : "M";
        var shipFileName;
        switch (i) {
            case 0:
                shipFileName = "New_Ship_Top";
                break;
            case hoverSize - 1:
                shipFileName = "New_Ship_Btm";
                break;
            default:
                shipFileName = "New_Ship_Mid";
                break;
        }
        newShipTileImg.src = "resources/" + shipFileName + ".png";
        colorizeShip(newShipTileImg, teamColor);
        newShipTileImg.classList.add("ship");
        newShipTileImg.height = cellSize;
        newShipTileImg.width = cellSize;
        cell.appendChild(newShipTileImg);
        let virtual_victim = virtual_player;
        if (getBoardID(callerCell.id) == "P2")
            virtual_victim = virtual_player_two;
        virtual_victim[getRow(cell.id)][getCol(cell.id)] = "S" + shipTileType;
        playerShipHealth++; // Increment health with each ship piece placed
    }
}

// Adds select image to a given cell
function singleSelect(cell) {
    // First check if anything has already been selected, if so unselect.
    if (currentSelectedTile != null) {
        unselect();
        // If the newly selected tile is the same as the previous, then stop after unselecting only.
        if (currentSelectedTile == cell) {
            currentSelectedTile = null;
            return;
        }
    }
    // set new tile to currently selected
    currentSelectedTile = cell;
    // Create the selection image and add it to the cell
    addImageToTile(cell, "selected_2", "selected");
}

// Removes select image from the last selected cell
function unselect() {
    // Find the selected image and remove it
    var selectionImg = currentSelectedTile.getElementsByClassName("selected")[0];
    if (selectionImg != null)
        currentSelectedTile.removeChild(selectionImg);
    currentSelectedTile = null;
}


// Places a selection image on current tile or places a ship if in ship placement mode
function tileClicked() {
    if (isSingleHighlight) {
        singleSelect(this)
    } else if (this.id[0] != "E" && isValidPlacementSpot) { // Don't place ships on enemy board
        placeGuiShip(this)
        isSingleHighlight = true;
        hoverSize = 1;
        itemsPlaced++;
        document.getElementById("sh" + selectedShipNum).disabled = true;
        document.getElementById("sh" + selectedShipNum).style.backgroundColor = "LightGreen";
        if (itemsPlaced >= 5) //Check if we can finish
            document.getElementById("finBtn").style.backgroundColor = "LightGreen";
    }
}

// Programmatically apply a color to a given ship image
function colorizeShip(shipTile, color) {
    // Create a new canvas to draw on
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    // Draw the image on the canvas
    var imageObj = new Image();
    imageObj.crossOrigin = " "; 
    imageObj.src = shipTile.src;
    imageObj.onload = function () {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        context.drawImage(imageObj, 0, 0);
        // Get the image data from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        // To brighten up the final image, add a brightness constant
        var brightness = 0.7;
        // Loop over each pixel and invert the color.
        for (var i = 0; i < data.length; i += 4) {
            data[i] *= color[0] + brightness;     // red
            data[i + 1] *= color[1] + brightness; // green
            data[i + 2] *= color[2] + brightness; // blue
        }
        // Draw the ImageData at the given (x,y) coordinates.
        context.putImageData(imageData, 0, 0);
        // Convert the canvas to a data URL in PNG format
        shipTile.src = canvas.toDataURL();
    };
}