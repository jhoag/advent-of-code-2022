const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


async function solve() {
     await getOverlappingAssignments();
    
}


async function getOverlappingAssignments() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let assignmentPairs = [];
    let completeOverlappingPairs = 0;
    let overlappingPairs = 0;
    for await (const line of rl) {
        let assignmentPair = getAssignmentPair(line);

        let completeOverlaps = completeOverlap(assignmentPair[0], assignmentPair[1]);
        let anyOverlaps = anyOverlap(assignmentPair[0], assignmentPair[1]);

        console.log(`${assignmentPair} - ${completeOverlaps} - ${anyOverlaps}`);

        if (completeOverlaps) {
            completeOverlappingPairs++;
        } 
        
        if (anyOverlaps) {
            overlappingPairs++;
        }
        assignmentPairs.push(assignmentPair);
    }

    console.log(completeOverlappingPairs);
    console.log(overlappingPairs);
}

function getAssignmentPair(line) {
    let pairs = []
    let rawPairs = line.split(',');

    rawPairs.forEach((pair) => {
        let rawExtremes = pair.split('-');
        pairs.push([parseInt(rawExtremes[0],10), parseInt(rawExtremes[1], 10)]);

        
    });

    return pairs;
}

function completeOverlap(pair1, pair2) {
    if (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) {
        return true;
    } 

    if (pair2[0] >= pair1[0] && pair2[1] <= pair1[1]) {
        return true;
    }

    return false;
}

function anyOverlap(pair1, pair2) {
    return (
        pair1[0] >= pair2[0] && pair1[0] <= pair2[1] ||
        pair1[1] >= pair2[0] && pair1[1] <= pair2[1] ||
        pair2[0] >= pair1[0] && pair2[0] <= pair1[1] ||
        pair2[1] >= pair1[0] && pair2[1] <= pair1[1]
    );
}




solve();
