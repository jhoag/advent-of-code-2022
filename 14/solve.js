const fs = require('fs');
const readline = require('readline');

let grid = [];
let minX = 10000;
let minY = 0;
let maxX = 0;
let maxY = 0;

async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        console.log("Start path");
        console.group();
        console.log(line);
        let path = line.split("->");

        for (let i = 1; i < path.length; i++) {
            let [startX, startY] = path[i-1].split(",");
            let [endX, endY] = path[i].split(",");

            drawPath(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10), parseInt(endY, 10));
        }
        console.groupEnd();
    }

    console.log(`${minX} / ${maxX} / ${minY} / ${maxY}`);
    drawGrid();
    maxY = maxY += 2;
    let sandCount = 0;
    let result = false;
    do {
        sandCount++;
        result = simulateGrain({ 
            x: 500, 
            y: 0
        });
       // drawGrid();
    } while (!(result.x == 500 && result.y == 0))

    console.log(sandCount);
}

function drawPath(startX, startY, endX, endY) {
    minX = Math.min(startX, endX, minX);
    maxX = Math.max(startX, endX, maxX);
    maxY = Math.max(startY, endY, maxY);
    console.log("Start line");
    console.group();
    console.log(`${startX},${startY} -> ${endX},${endY}`);
    if (startX > endX) {
        let tmp = endX;
        endX = startX;
        startX = tmp;
    }

    if (startY > endY) {
        let tmp = endY;
        endY = startY;
        startY = tmp;
    }

    if (startX == endX) { drawYLine(startX, startY, endY); }
    else if (startY == endY) { drawXLine(startY, startX, endX); }

    console.log(`${startX},${startY} -> ${endX},${endY}`);

    console.groupEnd();
}

function drawXLine(y, startX, endX) {
    console.log("drawXLine");
    console.group();
    
    for (let x = startX; x <= endX; x++) {
        populateGridSquare(x,y);
    }
    console.groupEnd();
}

function drawYLine(x, startY, endY) {
    console.log("drawYLine");
    console.group();
    for (let y = startY; y <= endY; y++) {
        populateGridSquare(x,y);
    }
    console.groupEnd();
}

function populateGridSquare(x,y) {
    if (grid[x] == null) {
        grid[x] = []
    }
    grid[x][y] = true;
    console.log(`${x},${y}: ${grid[x][y]}`);
}

function drawGrid() {

    for (let y = minY; y <= maxY; y++) {
        let row = "";
        for (let x = minX; x <= maxX; x++){
            row += convert(grid[x][y]);
        }
        console.log(row);

    }
}

function convert(cell) {
    if (cell) {
        return (cell == "S" ? "o" : "#")
    }
    return ".";
}
function simulateGrain(grain) {
    //console.log(`Start: ${JSON.stringify(grain)}`);
    // Straight down
    let offTheGrid;
    let moved;
    do {
        moved = (simulateDown(grain) || simulateLeft(grain) || simulateRight(grain));

    } while(moved);
    
    if(!grid[grain.x]) {
        grid[grain.x] = [];
    }
    grid[grain.x][grain.y] = "S";
    console.log(`End: ${JSON.stringify(grain)}`);
    return grain;
}

function simulateDown(grain) {
    let x = grain.x;
    let y = grain.y;

    let canGoDown = (!grid[x] || !grid[grain.x][grain.y + 1]);
    canGoDown = canGoDown && y + 1 < maxY;
    if (canGoDown) {
        grain.y = y + 1;
    }

    return canGoDown;
}

function simulateLeft(grain) {
    let x = grain.x;
    let y = grain.y;

    let canGoLeft = (!grid[x - 1] || !grid[grain.x - 1][grain.y + 1]);
    canGoLeft = canGoLeft && y + 1 < maxY;

    if (canGoLeft) {
        grain.x = x - 1;
        grain.y = y + 1;
    }

    return canGoLeft;
}

function simulateRight(grain) {
    let x = grain.x;
    let y = grain.y;

    let canGoRight = (!grid[x + 1] || !grid[grain.x + 1][grain.y + 1]);
    canGoRight = canGoRight && y + 1 < maxY;

    if (canGoRight) {
        grain.x = x + 1;
        grain.y = y + 1;
    }

    return canGoRight;
}


async function solve() {
    await solveForInput();
}

solve();
