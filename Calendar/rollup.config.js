import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

module.exports = {
    input: 'site/ts/index.ts',
    plugins: [
        nodeResolve(),
        postcss({
            config: false, // don't attempt to load a postcss config
            // extract: true
            // ^^^ for writing CSS to a separate file (dist/main.css).
            // in rollup v2, this writes CSS rules in wrong order (https://github.com/egoist/rollup-plugin-postcss/issues/96)
            // so, disable for now, and allow the CSS to be embedded in the JS
        }),
        typescript()
    ],
    output: {
        file: 'site/dist/index.js'
    }
}