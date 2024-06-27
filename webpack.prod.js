const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map",
        }),
    ],
    optimization: {
        minimize: true,
    },
});
