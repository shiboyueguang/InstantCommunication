/**
 * @description webpack配置
 * @type {import('webpack').Configuration}
 */

import {resolve as _resolve, join} from "path";
// const optimizeCss = require("optimize-css-assets-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HTMLPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    // 入口文件
    entry: "./src/main.tsx",
    // 打包输出文件夹
    output: {
        filename: "bundle.js",
        path: _resolve(__dirname, "./dist"),
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
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json'],
        alias: {
            '@': _resolve(__dirname, 'src/')
        }
    },
    // 插件
    plugins: [
        new HTMLPlugin({
            template: "./public/index.html"
        })
    ],
    // 服务器
    devServer: {
        static: {
            directory: join(__dirname, 'dist'),
        },
        compress: true,
        port: 8090,
        hot: true,
        open: true,
        // proxy: [{
        //     '/api':
        //         {
        //             target: 'http://localhost:3000',
        //             changeOrigin: true,
        //             pathRewrite: { '^/api': '' }
        //         },
        // }],
    }
};

export default config;