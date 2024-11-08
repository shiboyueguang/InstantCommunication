/**
 * @description 登录方面接口
 */
import { Router } from 'express';
import { connectDB, getDB } from "../db.js";
import jwt from 'jsonwebtoken';

const router = Router();

// 登录接口
router.post('/loginMain', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('userInfo');
    // 获取数据
    const userFindResult = await collection.find().toArray();
    const { userName, password } = req.body;
    // 获得token
    const user = userFindResult.find(u => u.account === userName && u.password === password);
    if(user) {
        const token = jwt.sign({ id: user._id, name: user.account }, 'moonUnder', { expiresIn: '1h'});
        res.json({
            token: token,
            code: 200,
            success: true
        });
    } else {
        res.json({
            token: '账号或密码错误',
            code: 400,
            success: false
        });
    }
});
// 获取用户名
router.get(`/getUserName/:token`, async (req, res) => {
    // // 连接数据库
    // await connectDB();
    // const database =  getDB();
    // const collection = database.collection('userInfo');
    // // 获取数据
    // const userFindResult = await collection.find().toArray();
    // let userIndex = -1;
    const token = req.params.token;
    const secretKey = 'moonUnder';
    const decoded = jwt.verify(token, secretKey);
    const name = decoded.name;
    console.log(decoded);
    // const userName = userFindResult.map((item,index) => {
    //     userIndex = index;
    //     return item.account;
    // });
    res.json({
        code: 200,
        userName: name,
        success: true
    });
});

export default router;