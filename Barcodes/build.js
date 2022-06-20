const start = new Date();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./build.json");

import path from "path";
import { fileURLToPath } from "url";

import { readFile } from "fs/promises";

import { exec } from "child_process";

import { optimize } from "svgo";

import { build } from "esbuild";

import clear from "esbuild-plugin-clear";

import axios from "axios";

Main()
async function Main() {
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    let tsPromise = new Promise(res => {
        exec("npx tsc --noEmit", (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            console.log(err || "");
            res();
        });
    });

    let buildPromise = build({
        entryPoints: config.files.map(file => `site/${file}`),
        outdir: "site/dist",
        bundle: true,
        minify: true,
        treeShaking: true,
        format: "esm",
        target: "es2020",
        plugins: [
            clear("./site/dist"),
            {
                name: "css-redirect",
                setup(build) {
                    build.onResolve({ filter: /^default\/.*\.css$/, namespace: "file" }, args => {
                        return {
                            path: path.resolve(dirname, "site/css", args.path)
                        };
                    });
                }
            },
            {
                name: "svg-redirect",
                setup(build) {
                    build.onResolve({ filter: /^images\/.*.svg$/, namespace: "file" }, args => {
                        return {
                            path: path.resolve(dirname, "site", args.path)
                        };
                    });
                }
            },
            {
                name: "http-css",
                setup(build) {
                    build.onResolve({ filter: /^https?:\/\/.*\.css$/ }, args => ({
                        path: args.path,
                        namespace: 'http-css',
                    }));

                    build.onLoad({ filter: /.*/, namespace: "http-css" }, async args => {
                        let css = await axios.get(args.path, {
                            transformResponse(r) { return r; }
                        });

                        return {
                            loader: "js",
                            resolveDir: path.resolve(dirname, "site/css"),
                            contents: `import {css} from "lit"; export default css\`${css.data}\`;`
                        }
                    });
                }
            },
            {
                name: "lit-svg",
                setup(build) {        
                    build.onLoad({ filter: /\.svg$/ }, async args => {
                        let contents = await readFile(args.path, "utf8");

                        contents = optimize(contents, {
                            path: args.path,
                            floatPrecision: 1,
                            plugins: [
                                {
                                    name: "preset-default",
                                    params: {
                                        overrides: {
                                            removeViewBox: false
                                        }
                                    }
                                }
                            ]
                        }).data;
            
                        return {
                            loader: "js",
                            contents: `import {svg} from "lit"; export default svg\`${contents}\`;`
                        };
                    });
                }
            },
            {
                name: "lit-css",
                setup(build) {
                    build.onLoad({ filter: /\.css$/, namespace: "file" }, async args => {
                        let textContent = await readFile(args.path, "utf8");

                        return {
                            loader: "js",
                            contents: `import {css} from "lit"; export default css\`${textContent}\`;`
                        }
                    });
                }
            }
        ]
    })
    .catch(() => {
        process.exit(1);
    });

    await Promise.all([tsPromise, buildPromise]);

    console.log(`Time taken: ${(new Date() - start) / 1000}s`);
}