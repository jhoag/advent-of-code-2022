const fs = require('fs');
const readline = require('readline');


let availableSteps = [];
let grid = [];

let start = { };
let end = { };

async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let y = 0;

    for await (const line of rl) {
        let cells = line.split('');
        let row = [];
        grid.push(row);
        for (let x = 0; x < cells.length; x++) {
            if (cells[x] == 'S') {
                row.push(1);
                start.x = x;
                start.y = y;
            } else if (cells[x] == 'E') {
                row.push(26);
                end.x = x;
                end.y = y;
            } else {
                row.push(cells[x].charCodeAt(0) - 96);
            }
        }
        y++;
    }

    // availableSteps.push({
    //     x: start.x,
    //     y: start.y,
    //     score: 0
    // });

    console.log(grid);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            console.log(`${x} ${y} ${grid[y][x]}`);
            if (grid[y][x] == 1) {
                availableSteps.push({
                    x,
                    y,
                    score: 0
                });
            }
        }
    }

   // console.log(availableSteps);
    let nextStep = getCheapest(availableSteps, SCORE_ALG);

    while(true) {  
        
        // Get all the valid steps from this node and add them to the list.
        let options = getValidSteps(nextStep);

        updateAvailableSteps(options);

        // Check which steps this opens up.
        nextStep = getCheapest(availableSteps, SCORE_ALG);
        console.log(`Available Steps: ${availableSteps.length}`);
        console.log(nextStep);

        if(nextStep.x == end.x && nextStep.y == end.y) {
            console.log("Found!");
            break;
        }
    }

    let s = nextStep
    console.log("Path");
    do {
        console.log(`${s.x},${s.y}: ${s.score}`);
        s = s.prev;
    } while(s.prev != null);
   
}

function getValidSteps(step) {
    console.log(step);
    let newNodes = [];
    let x = step.x;
    let y = step.y;
    let height = grid[y][x];

    for (let y2 = y-1; y2 <= y+1; y2++) {
        if (y2 >= 0 && y2 < grid.length && y2 != y) {
            if (grid[y2][x] <= height + 1){
                if (!doesPathContain(step, x, y2)) {
                    newNodes.push({
                        distanceFromEnd: distanceFromEnd(x, y2),
                        prev: step,
                        x: x,
                        y: y2,
                        score: step.score + 1
                    });
                }
            }
        }
    }

    for (let x2 = x-1; x2 <= x+1; x2++) {
        if (x2 >= 0 && x2 < grid[y].length && x2 != x) {
            if (grid[y][x2] <= height + 1){
                if (!doesPathContain(step, x2, y)) {
                    newNodes.push({
                        distanceFromEnd: distanceFromEnd(x2, y),
                        prev: step,
                        x: x2,
                        y: y,
                        score: step.score + 1
                    });
                }
            }
        }
    }

    return newNodes;
}

function updateAvailableSteps(options) {
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        for (let j = 0; j < availableSteps.length; j++) {
            if (availableSteps[j].x == option.x && availableSteps[j].y == options[i].y) {
                if (availableSteps[j].score > options[i].score) {
                    availableSteps[j] = options[i];
                }
                option = null;
                break;
            }
        }
        
        if (option != null) {
            availableSteps.push(option);
        }
    }
}

function distanceFromEnd(x,y) {
    let diffX = Math.abs(x - end.x);
    let diffY = Math.abs(y - end.y);

    return diffX + diffY;
}

function doesPathContain(head, x, y) {
    let step = head;

    while (step != null) {
        if (step.x == x && step.y == y) {
            return true;
        }
        step = step.prev;
    }

    return false;
}

let SCORE_ALG = 0;
let DIST_ALG = 1;

function getCheapest(possibleSteps, alg) {
    if (alg == SCORE_ALG) {
        possibleSteps.sort((a,b) => a.score-b.score);
    } else {
        possibleSteps.sort((a,b) => a.distanceFromEnd - b.distanceFromEnd);
    }
    
    return possibleSteps.shift();
}

async function solve() {
    await solveForInput();
}

solve();
