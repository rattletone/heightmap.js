const minify = require("rollup-plugin-babel-minify");

module.exports = [
    {
        input: "src/Heightmap.js",
        output: {
            file: "dist/heightmap.js",
            format: "umd",
            name: "Heightmap"
        }
    },
    {
        input: "src/Heightmap.js",
        output: {
            file: "dist/heightmap.min.js",
            format: "umd",
            name: "Heightmap"
        },
        plugins: [
            minify()
        ]
    }
];
