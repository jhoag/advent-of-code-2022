const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


const debug = false;
/**
 * Note - this one doesn't solve both puzzles, need to tweak the command function.
 */
async function solve() {
     await getOverlappingAssignments();
    
}


async function getOverlappingAssignments() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    let inCommandBlock = false;
    for await (const line of rl) {

        if (!inCommandBlock) {
            if (line === "") {
                for (idx in stacks) {
                    stacks[idx] = stacks[idx].reverse();
                }
                inCommandBlock = true;
                console.log(stacks);
            } else {
                addLineToStacks(line);
            }
        } else {
            let command = line.split(" ");
            executeCommand(command[1], command[3], command[5], true);
        }
    }
    
    console.log(stacks);

    let result = "";
    for (idx in stacks) {
        result += stacks[idx].pop();
    }

    console.log(result);

  
}

let stacks = [
    [], [], [], [], [], [], [], [], []    
];

function addLineToStacks(line) {
    
    let start = 0;
    let finish = 3;

    for (let i = 0; i < stacks.length; i++) {
    
        let crate = line.slice(start, finish);
        if (crate.indexOf('[') > -1) {
            stacks[i].push(crate[1]);
        }

        start = start += 4
        finish = finish += 4;
    }
    
}

// Upgraded = solution for puzzle 2.
function executeCommand(count, from, to, upgraded) {
    if (debug) {
        console.log("---");
        console.log(stacks);
    }

    console.log(`Move ${count} from ${from} to ${to} - ${upgraded ? "Upgraded" : "Not Upgraded" }`);

    if (!upgraded) {
        for (let i = 0; i < count; i++) {
            let item = stacks[ from - 1].pop();
            stacks[to-1].push(item);
        }
    } else {
        let movedCrates = stacks[from-1].slice(-count);
        console.log("---")
        console.log(movedCrates);
        console.log(stacks[from-1].slice(0,-(count)));
        console.log("---")
        stacks[from-1] = stacks[from-1].slice(0,-(count));
        stacks[to-1] = stacks[to-1].concat(movedCrates);
    }

    if(debug){
        console.log(stacks);
        console.log("---");
    }
}

solve();
