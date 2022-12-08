const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


const debug = false;
/**
 * Note - this one doesn't solve both puzzles, need to tweak the command function.
 */
async function solve() {
     await getSignal();
    
}


async function getSignal() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let charactersRequired = 14;

    for await (const line of rl) {
        for (idx in line) {
            idx = parseInt(idx, 10);
            if (idx >= (charactersRequired-1)) {
                let str = line.slice(idx-(charactersRequired - 1), idx+1);
                let charactersUnique = areCharactersUnique(str);

                console.log(`${str} - ${charactersUnique}`);

                if (charactersUnique) {
                    console.log(idx + 1);
                    break;
                }

            }
        }
    }
       
}

function areCharactersUnique(str) {
    for (i in str) {
        i = parseInt(i,10);
        for (let j = i + 1; j < str.length; j++) {
            console.log(`${i}: ${str[i]} ${j} : ${str[j]}`);
            if (str[i] == str[j]) {
                return false;
            }
        }
    }

    return true;
}

solve();
