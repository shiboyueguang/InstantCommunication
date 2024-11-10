/**
 * @description 主界面方面接口
 */
import { Router } from 'express';
import { connectDB, getDB } from "../db.js";
import {ObjectId} from "mongodb";

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
});
// 增加群聊
router.post('/addChatGroupName', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('groupName');
    // 获取数据
    const { groupName } = req.body;
    // 加入数据
    await collection.insertOne({ name: groupName, createTime: new Date() });
    res.json({ success: true });
});
// 删除群聊
router.delete('/deleteChatGroupName/:groupName', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('groupName');
    // 获取数据
    const { groupName } = req.params;
    // 删除数据
    await collection.deleteOne({ name: groupName });
    res.json({ success: true });
});
// 获取动态
router.get('/getDynamic', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('newsMessages');
    // 获取数据
    const dynamicResult = await collection.find().toArray();
    res.json(dynamicResult);
});
// 增加动态
router.post('/addDynamic', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('newsMessages');
    // 获取数据
    const { id, userName, content } = req.body;
    // 加入数据
    await collection.insertOne({ id , userName, content, timestamp: new Date().toLocaleString() });
    res.json({ success: true });
});
// 删除动态
router.delete('/deleteDynamic/:id', async (req, res) => {
    // 连接数据库
    await connectDB();
    const database =  getDB();
    const collection = database.collection('newsMessages');
    // 获取数据
    const { id } = req.params;
    const objectId = new ObjectId(id);
    // 删除数据
    await collection.deleteOne({ ObjectId: objectId });
    res.json({ success: true });
});

export default router;