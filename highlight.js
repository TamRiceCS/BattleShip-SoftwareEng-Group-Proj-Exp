// Changes the highlight size from 1x1 to whatever is needed for the ship
function changeHighlightSize(length, clickedShipNum) {
    // User clicks button while in the generic hover state
    if (isSingleHighlight) {
        isSingleHighlight = false;
        hoverSize = length;
        selectedShipNum = clickedShipNum;
    }
    // User clicks button while in the ship hover state
    else {
        if (clickedShipNum == selectedShipNum) {
            // user clicked the same button, go back to generic hover state
            isSingleHighlight = true;
            hoverSize = 1;
            selectedShipNum = 0;
        }
        else {
            // user clicked a different button, switch to the correct ship
            hoverSize = length;
            selectedShipNum = clickedShipNum;
        }
    }
}



// highlight the current tile
function highlight() {
    if (((this.id[0] == "E" && !isSingleHighlight)) || // Don't highlight enemy board during ship placement
        (isSingleHighlight && !validCoordinates(this)) || // Don't highlight invalid coordinates
        (!isSingleHighlight && !placementValid(this))) // Don't highlight invalid ship placement
    {
        isValidPlacementSpot = false;
        return;
    }
    if (isSingleHighlight) { // generic single square hover
        addImageToTile(this, "Highlight", "highlightImg");
        currentHighlightedTiles.push(this);
    }
    else { // Multi-square ship placement hover - vertical
        isValidPlacementSpot = true;
        for (var i = 0; i < hoverSize; i++) {
            var cell;
            if (isVertical)
                cell = document.getElementById(getBoardID(this.id) + "," + (getRow(this.id) + i) + "," + getCol(this.id));
            else

                cell = document.getElementById(getBoardID(this.id) + "," + getRow(this.id) + "," + (getCol(this.id) + i));
            // Make sure the cell isn't already highlighted
            if (currentHighlightedTiles.includes(cell))
                continue;
            addImageToTile(cell, "Highlight", "highlightImg");
            currentHighlightedTiles.push(cell);
        }
    }
}

// unhighlight the current tile
function unHighlight() {
    while (currentHighlightedTiles.length > 0) {
        var cell = currentHighlightedTiles.pop();
        var highlightImg = cell.getElementsByClassName("highlightImg")[0];
        if (highlightImg != null)
            cell.removeChild(highlightImg);
    }
}