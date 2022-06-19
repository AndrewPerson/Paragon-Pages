import { readFile, access } from "fs/promises";
import process from "process";

let files = JSON.parse(await readFile(`${process.env.HOME}/files.json`));

let directories = new Set();
for (let file of files) {
    let parts = file.split("/");

    if (parts.length == 1) continue;

    let directory = file.split("/")[0];

    directories.add(directory);
}

let configs = [];
for (let directory of directories) {
    try {
        await access(`./${directory}/config.json`);

        let config = JSON.parse(await readFile(`./${directory}/config.json`));

        configs.push({
            ...config,
            directory: directory
        });
    }
    catch (e) {
        
    }
}

console.log(JSON.stringify({
    project: configs.length === null ? null : configs.map(config => 
        ({
            name: config.name,
            directory: config.directory,
            build: config.build
        })
    )
}));