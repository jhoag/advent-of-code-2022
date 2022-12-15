const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


const debug = false;
/**
 * Note - this one doesn't solve both puzzles, need to tweak the command function.
 */
async function solve() {
     await getTrees();
}

async function getTrees() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let grid=[];
    let row = 0;
    for await (const line of rl) {
        // Create the grid.
        grid[row] = [];

        for (let i = 0; i < line.length; i++) {
            grid[row].push(parseInt(line.charAt(i),10));
        }

        row++;
    }

    let count = 0;
    let highestScore = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let [isTreeVisible, scenicScore] = isVisible(grid, x, y);

            if (isTreeVisible) {
                count++;
            }

            if (scenicScore > highestScore) {
                highestScore = scenicScore;
            }
        }
    }
    console.log(count);
    console.log(highestScore);

}

function isVisible(grid, x, y) {
    let yMax = grid.length;
    let xMax = grid[0].length;

    let visibleFromEdge = false;
    let totalScenicScore = 0;
    
    let visible = true;    
    let scenicScore = 0;

    let height = grid[y][x];
    console.log(`${x}, ${y} = ${height}`);

    // Check Y
    for (let y2 = y-1; y2 >= 0; y2--) {
        scenicScore++;
        if (grid[y2][x] >= height) {
            visible = false;
            break;
        }
    }
    
    console.log(`Score = ${scenicScore}`);
    totalScenicScore = scenicScore
    visibleFromEdge = visibleFromEdge || visible;

    visible = true;
    scenicScore = 0;

    // Check Y
    for (let y2 = y+1; y2 < yMax; y2++) {
        scenicScore++;
        if (grid[y2][x] >= height) {
            visible = false;
            break;
        }
    }

    console.log(`${totalScenicScore} * ${scenicScore} = ${totalScenicScore * scenicScore}`);
    totalScenicScore *= scenicScore;
    visibleFromEdge = visibleFromEdge || visible;

    visible = true;
    scenicScore = 0;
    // Check X
    for (let x2 = x-1; x2 >= 0; x2--) {
        scenicScore++;
        if (grid[y][x2] >= height) {
            visible = false;
            break;
        }
    }

    console.log(`${totalScenicScore} * ${scenicScore} = ${totalScenicScore * scenicScore}`);
    totalScenicScore *= scenicScore;
    visibleFromEdge = visibleFromEdge || visible;

    visible = true;
    scenicScore = 0;
    // Check X
    for (let x2 = x+1; x2 < xMax; x2++) {
        scenicScore++;
        if (grid[y][x2] >= height) {
            visible = false;
            break;
        }
    }

    console.log(`${totalScenicScore} * ${scenicScore} = ${totalScenicScore * scenicScore}`);
    totalScenicScore *= scenicScore;
    visibleFromEdge = visibleFromEdge || visible;

    console.log("---");
    return [visibleFromEdge, totalScenicScore];
    
}

solve();

