class Ship {
    constructor() {
        this.row = -1;
        this.col = -1;
        this.position = [];
        this.ship_health = -1
    }

    isSunk() {
        if (this.ship_health == 0)
            return true;
        else
            return false;
    }

}

let sunk = 0
function checkSunk(ships) {
    let unsunk = 0;
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].ship_health != 0) {
            unsunk++;
        }
        else if (ships[i].ship_health == 0) {
            sunk++;
            document.getElementById("mine3").innerHTML = "Ships Sank: " + sunk;

        }

    }
    document.getElementById("mine4").innerText = "Unsunk Ships: " + unsunk.toString();


}


function hit(num1, num2, ships) {
    for (let i = 0; i < ships.length; i++) {
        if (num1 == ships[i].row) {
            // console.log("Im here in row. row: " + num1 + " col: " + num2);
            // console.log("Value of include: " + ships[i].position.includes(num2));

            if (ships[i].position.includes(num2)) {
                ships[i].ship_health--;
                // console.log("Health: " + ships[i].ship_health + " i = "  + i);
            }
        }
        else if (num2 == ships[i].col) {
            // console.log("Im here in Col. row: " + num1 + " col: " + num1);
            // console.log("Value of include: " + ships[i].position.includes(num1));
            if (ships[i].position.includes(num1)) {
                ships[i].ship_health--;
                // console.log("Health: " + ships[i].ship_health + " i = "  + i);


            }
        }

    }
}  