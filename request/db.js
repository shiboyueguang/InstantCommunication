import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let database;
/**
 * @description 连接数据库
 */
export async function connectDB() {
    try {
        // 连接到MongoDB
        await client.connect();
        // console.log("Connected successfully to MongoDB");
        database = client.db('InstantCommunication');
        return database;
    } catch (err) {
        console.error(err);
        throw new Error("连接数据库失败！！！");
    }
}
export function getDB() {
    if(!database) {
        throw new Error("数据库没有连接！！！");
    }
    return database;
}