import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import json from "@rollup/plugin-json";

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
    contentBase: ["./dist"],
    file: "index.js",
    host: "127.0.0.1",
    port: 5035,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    nodeResolve({}),
    commonjs(),
    typescript(),
    json(),
    // babel({
    //     exclude: "node_modules/**",
    // }),
    dev && serve(serveopts),
    !dev && terser(),
];

export default [
    {
        input: "src/index.ts",
        output: {
            file: "dist/magic-cards.js",
            name: "MagicCard",
            format: "es",
        },
        plugins: [...plugins],
    },
];