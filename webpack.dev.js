const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
require("dotenv").config();

const common = require("./webpack.common.js");

const outputPath = process.env.WEBPACK_DEVELOPMENT_MATRIX_PATH
    ? process.env.WEBPACK_DEVELOPMENT_MATRIX_PATH
    : path.resolve(__dirname, "dist");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].js",
        path: outputPath,
    },
    plugins: [new webpack.ProgressPlugin()],
    optimization: {
        minimize: false,
    },
    devtool: "inline-source-map",
    watch: true,
});
