const fs = require('fs');
const readline = require('readline');

async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let packets = [
        [[2]],
        [[6]]
    ];

    for await (const line of rl) {
        if (line == "") {
        } else {
            packets.push(JSON.parse(line));
        }
    }   


    packets.sort((a,b) => compareArrays(b,a));
    
    console.log(packets);
    
    let score = 0;
    packets.forEach((v, idx) => {
        if (JSON.stringify(v) == "[[2]]") {
            score += (idx+1);
        } else if (JSON.stringify(v) == "[[6]]") {
            score *= (idx+1);
        }
    });

    console.log(score);
}

function compare(pair) {
    pair.correctOrder = (compareArrays(pair.first, pair.second) > 0);
    console.log("");
}

function compareArrays(left, right) {
    console.log(`Comparison ${JSON.stringify(left)} - ${JSON.stringify(right)}`);
    console.group();
    
    let ret = 0;
    for (let i = 0; i < left.length; i++) {
        // Is the right side empty?
        if (i >= right.length) {
            console.log('Right side is out of elements, inputs are in the wrong order.');
            ret = -1;
            break;
        }

        let leftItem = left[i];
        let rightItem = right[i];

        if (Array.isArray(leftItem) || Array.isArray(rightItem)){
            if (!Array.isArray(leftItem)) {
                leftItem = [leftItem];
            }
    
            if (!Array.isArray(rightItem)) {
                rightItem = [rightItem];
            }
        
            ret = compareArrays(leftItem, rightItem);
        } else {
            ret = comparseInts(leftItem, rightItem);
        }

        if (ret != 0) {
            console.log(`Inputs are ${(ret < 0) ? "NOT" : ""} in the correct order`);
            break;
        }
    }

    if (ret == 0 && right.length > left.length) {
        console.log(`Left side out of items, inputs are in right order`);
        ret = 1;
    }

    console.groupEnd();

    return ret;
}

// < 0 - wrong order, > 0 - right order.
function comparseInts(left, right) {
    console.log(`Comparing ${left} vs ${right}`);
    return right - left;
}

async function solve() {
    await solveForInput();
}

solve();
