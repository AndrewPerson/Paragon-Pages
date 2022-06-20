import { readFile } from "fs/promises";
import process from "process";

let files = JSON.parse(await readFile(`${process.env.HOME}/files.json`));

let directories = new Set();
for (let file of files) {
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

if (configs.length != 0) console.log(JSON.stringify({
    project: configs.map(config => {
        let fullUploadPath = config.directory.split("/");

        if (config.upload) fullUploadPath.push(...config.upload.split("/"));

        return {
            name: config.name,
            build: config.build ?? null,
            "build-working-directory": config.directory,
            upload: fullUploadPath[fullUploadPath.length - 1],
            "upload-working-directory": fullUploadPath.length == 1  ? "" : fullUploadPath[0]
        };
    })
}));