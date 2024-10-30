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
        const token = jwt.sign({ id: user.id }, 'moonUnder', { expiresIn: '1h'});
        res.json({ token });
    } else {
        res.json("账号或密码错误");
    }
});

export default router;