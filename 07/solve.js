const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');


const debug = false;
/**
 * Note - this one doesn't solve both puzzles, need to tweak the command function.
 */
async function solve() {
     await getDirSizes();
    
}

let directories = {

};

let context = [];

async function getDirSizes() {

    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    for await (const line of rl) {
        if (line[0] == "$") {
            // This is a command.
            if (line.indexOf("cd") > -1) {
                let directoryName = line.split(' ')[2];
                if (directoryName == "..") {
                    context.pop();
                } else {
                    let path = context.reduce((p,v) => {
                        return p + "/" + v.name;
                    },"");
                    console.log(`${line} -> ${path}`);
                    path += "/" + directoryName
                    if (directories[path] == null) {
                        directories[path] = {
                            name: path,
                            size: 0
                        }
                    }

                    context.push(directories[path]);
                }
                
            }
        } else if (line.indexOf("dir") == 0) {
            // This is a dir - don't do anything.
        } else {
            console.log(`${line}`);
            // this is a file - add it to the context
            let size = parseInt(line.split(' ')[0],10);
            let path = "";
            context.forEach((i) => {
                i.size += size;
                path += i.name + " ";
            });
            console.log(`Added ${size} to ${path}`);
        }
    }
    
    console.log("---");
    let totalSize = 0;
    let fileSize = 70000000;
    let targetFree = 30000000;
    let requiredDeleteSize = targetFree - (fileSize - directories['//'].size);
    let smallest = 70000000;

    console.log(`Required: ${requiredDeleteSize}`);

    Object.keys(directories).forEach((i) => {
        let directoryInfo = directories[i];
        if (directoryInfo.size <= 100000) {
            totalSize += directoryInfo.size;
        }

        if (directoryInfo.size >= requiredDeleteSize && directoryInfo.size < smallest) {
            smallest = directoryInfo.size;
        }
    });

    console.log(totalSize);
    console.log(smallest);
}

solve();
