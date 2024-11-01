import express from 'express';
import loginRoute from './loginInterface/loginInterface.js'
import bodyParser from "body-parser";
import cors from 'cors';

/**
 * @description 后端服务器入口文件
 */

// 设置服务器
const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/login',loginRoute);

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
