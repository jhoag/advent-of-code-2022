const { match } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const readline = require('readline');


async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let cycle = 0;
    // register value at cycle.
    let registerValue = [1]
    for await (const line of rl) {
        if (line.indexOf('noop') > -1) {
            // No Op
            registerValue.push(registerValue[registerValue.length - 1]);
        } else {
            let value = parseInt(line.split(' ')[1], 10);
            registerValue.push(registerValue[registerValue.length-1]);
            registerValue.push(registerValue[registerValue.length-1] + value);
        }
    }

    let i = 19;
    let result = 0;
    while (i < registerValue.length) {
        let signalStrength = (i+1) * registerValue[i];
        result += signalStrength;
        console.log(`${i+1} * ${registerValue[i]} = ${signalStrength} (${result})`);
        i+=40;
    }

    console.log(result);

    // Render
    let pixel = 0;
    let row = ""
    for (let cycle = 0; cycle < registerValue.length; cycle++) {
        if (pixel == 40) {
            pixel = 0;
            row += " / ";
            console.log(row);
            row = "";
        }

        let registerVal = registerValue[cycle];
        if (registerVal >= pixel - 1 && registerVal <= pixel +1) {
            row += " # ";
        } else {
            row += " . ";
        }

        pixel++;
    }
}

async function solve() {
    await solveForInput();
}

solve();
