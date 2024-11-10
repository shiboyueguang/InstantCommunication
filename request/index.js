import express from 'express';
import loginRoute from './loginInterface/loginInterface.js'
import bodyParser from "body-parser";
import cors from 'cors';
import mainRoute from "./mainInterface/mainInterface.js";
import * as http from "node:http";
import {Server} from "socket.io";

/**
 * @description 后端服务器入口文件
 */

// 设置服务器
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8090",
        methods: ["GET", "POST"]
    },
});

io.on('connection', (socket) => {
    // console.log('a user connected');

    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`user joined room ${room}`);
    })

    socket.on('chat message', (data) => {
        const { room } = data;
        io.to(room).emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/login',loginRoute);
app.use('/main', mainRoute);
// app.use('/chat', chatRouter(io));

// 启动服务器
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
