/**
 * @description webpack配置
 * @type {import('webpack').Configuration}
 */

const path = require("path");
// const optimizeCss = require("optimize-css-assets-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin");

const config = {
    // 入口文件
    entry: "./src/main.tsx",
    // 打包输出文件夹
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
    mode: "development",
    module: {
        rules: [
            // 匹配.css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            // 匹配.ts和.tsx文件
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // 匹配照片
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json']
    },
    plugins: [
        new HTMLPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8088,
        hot: true,
        open: true
    }
};

module.exports = config;