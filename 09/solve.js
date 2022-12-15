const { match } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const readline = require('readline');

let numberOfTails = 9;
let tails = [];

for (let i = 0; i < numberOfTails; i++) {
    tails.push({
        x: 0,
        y: 0,
        visited: {}
    });
}
let tail = {
    x: 0,
    y: 0
}

let head = {
    x: 0,
    y: 0
}

async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log(`X - Head: ${head.x},${head.y}  Tail: ${tail.x},${tail.y}`);

    for await (const line of rl) {
        let command = line.split(' ');

        let count = parseInt(command[1], 10);

        for (let i = 0; i < count; i++) {
            moveHead(command[0]);
            for (let j = 0; j < numberOfTails; j++) {
                let leader = (j == 0) ? head : tails[j-1];
                moveTail(leader, tails[j]);
            }
            console.log(`${command[0]} - Head: ${head.x},${head.y}  Tail: ${tails[numberOfTails-1].x},${tails[numberOfTails-1].y}`);
        }       
    }

    console.log(Object.keys(tails[numberOfTails-1].visited).length);

}

function moveHead(direction) {
    if (direction == 'U') {
        head.y += 1;
    } else if (direction == 'R') {
        head.x += 1;
    } else if (direction == 'D') {
        head.y -= 1;
    } else {
        head.x -= 1;
    }

}

function moveTail(leader, follower) {
    let [diffX, diffY] = calculateDistance(leader,follower);

    let isDiagonalRequired = diagonalRequired(diffX, diffY);

    let distanceRequiredForMove = (isDiagonalRequired) ? 1 : 2;
    if (diffX <= -distanceRequiredForMove) {
        follower.x -= 1;
    } else if (diffX >= distanceRequiredForMove) {
        follower.x += 1;
    }

    if (diffY <= -distanceRequiredForMove) {
        follower.y -= 1;
    } else if (diffY >= distanceRequiredForMove) {
        follower.y += 1;
    }

    let key = `${follower.x},${follower.y}`;

    if (follower.visited[key]) {
        follower.visited[key]++;
    } else {
        follower.visited[key] = 0;
    }
}

function calculateDistance(leader, follower) {
    let x = leader.x - follower.x;
    let y = leader.y - follower.y

    return [x, y];
}

function diagonalRequired(xDiff, yDiff) {
    return ((xDiff != 0 && yDiff != 0) && (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1));
}

async function solve() {
    await solveForInput();
}

solve();
