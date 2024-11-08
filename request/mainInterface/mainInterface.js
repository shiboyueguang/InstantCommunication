/**
 * @description 主界面方面接口
 */
import { Router } from 'express';
import { connectDB, getDB } from "../db.js";

const router = Router();

// 获取聊天群名接口
router.get('/getChatGroupName', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('groupName');
    //获取数据
    const groupNameResult = await collection.find().toArray();
    res.json(groupNameResult);
})

export default router;