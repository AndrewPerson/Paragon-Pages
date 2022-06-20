import { readFile, access } from "fs/promises";
import process from "process";

let files = JSON.parse(await readFile(`${process.env.HOME}/files.json`));

let directories = new Set();
for (let file of files) {
    let parts = file.split("/");

    let directory = file.split("/")[0];

    directories.add(directory);
}

let configs = [];
for (let directory of directories) {
    try {
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
    project: configs.length == 0 ? null : configs.map(config => 
        ({
            name: config.name,
            directory: config.directory,
            build: config.build || null,
            upload: config.upload || null
        })
    )
}));