module.exports = {
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    entry: {
        BPP: {
            import: "./src/BPP/Plugin.ts",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /(node_modules)|(ts\/types)/,
            },
            { test: /\.d.ts$/, use: "raw-loader" },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ],
    },
};
