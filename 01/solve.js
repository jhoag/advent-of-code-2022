const fs = require('fs');
const readline = require('readline');

async function solve() {
    let elves = await getTotalElfCalories();

    elves.sort((a,b) => {
        return a - b;
    });

    console.log(`Top elf's calories: ${elves[elves.length - 1]}`);
    console.log(`Top 3 elves calories: ${elves[elves.length-1] + elves[elves.length-2] + elves[elves.length-3]}`);
}

async function getTotalElfCalories() {

    const fileStream = fs.createReadStream('input.txt');

    const elves = [];
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let elf = 0;
    for await (const line of rl) {
        if (line === '') {
            elves.push(elf);
            elf = 0;
        } else {
            elf += parseInt(line, 10);
        }
    }

    return elves;
}

solve();
