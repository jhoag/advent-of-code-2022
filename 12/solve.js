const { match } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const readline = require('readline');


let route = [];
let grid = [];

// { x, y, score, paths: [] }
async function solveForInput() {

    const fileStream = fs.createReadStream('input-s.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let y = 0;
    let start = { };
    let end = { };
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

    for (let y = 0; y < grid.length; y++) {
        console.log(grid[y]);
    }

    route.push({
        x: start.x,
        y: start.y,
        score: 0
    });

    //for (let i = 0; i < 30; i++) {
        let current = route[route.length - 1];
        let options = getValidSteps(current);

        console.log(getCheapest(options));

        

    //}
   
}

function getValidSteps(step) {
    if (step.paths) {
        step.paths;
    }

    let x = step.x;
    let y = step.y;
    let height = grid[y][x];

    step.paths = [];
    for (let y2 = y-1; y2 <= y+1; y2++) {
        if (y2 >= 0 && y2 < grid.length && y2 != y) {
                if (grid[y2][x] <= height + 1){
                    if (!doesPathContain(step, x, y2)) {
                        step.paths.push({
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
                    step.paths.push({
                        prev: step,
                        x: x2,
                        y: y,
                        score: step.score + 1
                    });
                }
            }
        }
    }

    return step.paths;
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

function getCheapest(possibleSteps) {
    let cheapest = null;
    for (let i = 0; i < possibleSteps.length; i++) {
        let possibleStep = possibleSteps[i];
        if (possibleStep.score != null) {
            if (cheapest == null) {
                cheapest = possibleStep;
            } else if (cheapest.score > possibleStep.score) {
                cheapest = possibleStep;
            }
        }
    }

    return cheapest;
}

async function solve() {
    await solveForInput();
}

solve();

// // too high
