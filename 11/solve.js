const { match } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const readline = require('readline');


let monkies = [];
async function solveForInput() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let monkey;
    let testStr;
    let trueStr;
    let falseStr;

    for await (const line of rl) {
        if (line.indexOf('Monkey') > -1) {
            monkey = {
                items: [],
                inspected: 0
            };
            monkies.push(monkey);
        } else if (line.indexOf('Starting items') > -1) {
            setStartingItems(monkey, line.split(':')[1])
        } else if (line.indexOf('Operation') > -1) {
            setOperation(monkey, line.split('=')[1]);
        } else if (line.indexOf('Test') > -1) {
            testStr = line.split('by')[1];
        } else if (line.indexOf('true') > -1) {
            trueStr = line.split('monkey')[1];
        } else if (line.indexOf('false') > -1) {
            falseStr = line.split('monkey')[1];
            setTestOperation(monkey, testStr,trueStr,falseStr);
        }
    }

    console.dir(monkies);
    console.log(`Supermod: ${superMod}`);
    
    let roundMax = 10000;

    for (let i = 0; i < roundMax; i++) {
        console.log(`--- ${i}`);

        for (let j = 0; j < monkies.length; j++) {
            processMonkey(j);
        }

        console.dir(monkies);
    }

    let monkeyBusiness = [];
    for (let i = 0; i < monkies.length; i++) {
        monkeyBusiness.push(monkies[i].inspected);
    }

    monkeyBusiness.sort((a,b) => b - a);
    console.log(monkeyBusiness);

    console.log(monkeyBusiness[0] * monkeyBusiness[1]);
}

function processMonkey(index) {
    let monkey = monkies[index];

    while (monkey.items.length > 0) {
        let startWorry = monkey.items.shift();
        let endWorry = monkey.operation(startWorry);

        let targetMonkey = monkey.testOperation(endWorry);

        console.log(`Monkey ${index}: ${startWorry} -> ${endWorry} throwing to ${targetMonkey}`);
        monkies[targetMonkey].items.push(endWorry);
        monkey.inspected++;
    }

}

function setStartingItems(monkey, itemString) {
    let items = itemString.split(',');

    for (let i = 0; i < items.length; i++) {
        monkey.items.push(items[i]);
    }
}

function setOperation(monkey, operationString) {
    let opString = `
        (old) => ${operationString}
    `

    let op = eval(opString);

    monkey.operation = (old) => {
        old = old % superMod;
        let newWorry = op(old);
        return (newWorry);
    }
}

let superMod = 0;
function setTestOperation(monkey, test, trueAction, falseAction) {

    if (superMod == 0) {
        superMod += parseInt(test, 10);
    } else {
        superMod *= parseInt(test, 10);
    }

    console.log(`${test} - ${trueAction} - ${falseAction}`);
    let testOp = (worry) => (worry % parseInt(test, 10) == 0) ? parseInt(trueAction, 10) : parseInt(falseAction, 10);
    
    monkey.testOperation = testOp;
}

async function solve() {
    await solveForInput();
}

solve();

// // too high
