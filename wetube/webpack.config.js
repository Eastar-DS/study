const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// console.log(__dirname)
// C:\Users\Dororo\Desktop\study\wetube
const path = require("path")
// console.log(path.resolve(__dirname,"assets", "js"))
// C:\Users\Dororo\Desktop\study\wetube\assets\js
module.exports = {
    // 여기부터
    // entry: "./src/client/js/main.js",
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    // plugins: [new MiniCssExtractPlugin()],
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
    mode: "development",
    watch: true,
    output: {
        // filename: "main.js",
        // filename: "js/main.js",
        filename: "js/[name].js",
        // path: path.resolve(__dirname,"assets", "js"),
        path: path.resolve(__dirname,"assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 여기까지는 필수적으로 기억하고 이해해야함.
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ],
                      },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    }
}