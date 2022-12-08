const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


async function solve() {
     await getDuplicateItemPriorities();


    
}

async function getDuplicateItemPriorities() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    let matchingItems = [];
    let badgeItems = [];
    let group = [];
    for await (const line of rl) {
        let compartments = [ line.slice(0, (line.length / 2)), line.slice((line.length / 2))];

        matchingItems.push(findMatchingItems(compartments[0], compartments[1])[0]);        

        group.push(line);

        if(group.length == 3) {
            badgeItems.push(findBadgeItem(group[0], group[1], group[2])[0]);
            group = [];
        }
    }

    let score = 0;
    let badgeScore = 0;
    for (idx in matchingItems) {
        score += getPriority(matchingItems[idx]);
    }

    for (idx in badgeItems) {
        badgeScore += getPriority(badgeItems[idx]);
    }

    console.log(score);
    console.log(badgeScore);
}

function getPriority(char) {
    let priority = char.charCodeAt(0);

    if (priority >= 97) {
        return priority - 96;
    } else {
        return (27) + (priority - 65)
    }
}

function findBadgeItem(a, b, c) {
    let duplicatedItemsA = findMatchingItems(a,b);
    let duplicatedItemsB = findMatchingItems(b,c);

    let duplicatedItems = findMatchingItems(duplicatedItemsA.join(""), duplicatedItemsB.join(""));

    console.log(duplicatedItems);
    return duplicatedItems;
}

function findMatchingItems(a, b) {
    let duplicatedItems = [];
    for (let i = 0; i < a.length; i++) {
        let itemType = a[i];
        if (b.indexOf(itemType) > -1) {
            if (!duplicatedItems.includes(itemType)) {
                duplicatedItems.push(itemType);
            }
        }
    }
    return duplicatedItems;
}

solve();

// 8240

