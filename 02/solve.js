const fs = require('fs');
const readline = require('readline');


function convert(symbol) {
    if (symbol == "A" || symbol == "X") {
        return "ROCK";
    } else if (symbol == "B" || symbol == "Y") {
        return "PAPER";
    } else {
        return "SCISSORS";
    }
}

const choiceScoreLookUp = {
    // Rock
    "ROCK" : 1,
    // Paper
    "PAPER" : 2,
    // Scissors
    "SCISSORS": 3
};

// first - what they've selected.
// second - what you've selected.
const roundScoreLookUp = {
    "ROCK" : {
        "ROCK" : 3,
        "PAPER" : 6,
        "SCISSORS" : 0
    },
    "PAPER" : {
        "ROCK" : 0,
        "PAPER" : 3,
        "SCISSORS" : 6
    },
    "SCISSORS" : {
        "ROCK" : 6,
        "PAPER" : 0,
        "SCISSORS" : 3
    }
}

const responseLookUp = {
    "ROCK" : {
        "X" : "SCISSORS",
        "Y" : "ROCK",
        "Z" : "PAPER"
    },
    "PAPER" : {
        "X" : "ROCK",
        "Y" : "PAPER",
        "Z" : "SCISSORS"
    },
    "SCISSORS" : {
        "X" : "PAPER",
        "Y" : "SCISSORS",
        "Z" : "ROCK"
    }
}

async function solve() {
    let [scoreOne, scoreTwo] = await getTotalScore();

    console.log(scoreOne);
    console.log(scoreTwo);
    
}

async function getTotalScore() {

    const fileStream = fs.createReadStream('input.txt');

    const elves = [];
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let answerOneScore = 0;
    let answerTwoScore = 0;
    for await (const line of rl) {
        let moves = line.split(" ");

        let opponent = convert(moves[0]);
        answerOneScore += getScore(opponent, convert(moves[1]));
        answerTwoScore += getScore(opponent, responseLookUp[opponent][moves[1]]);


    }

    return [answerOneScore,answerTwoScore];
}

function getScore(opponent, response) {
    let score = choiceScoreLookUp[response];

    score += roundScoreLookUp[opponent][response];

    return score;
}

solve();
