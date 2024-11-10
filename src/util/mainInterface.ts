import axios, { AxiosInstance } from "axios";

/**
 * @description 主界面接口调用
 */

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getChatGroupName = async () => {
    try {
        const response = await apiClient.get('/main/getChatGroupName');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const getDynamic = async () => {
    try {
        const response = await apiClient.get('/main/getDynamic');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

interface addMsg {
    id: number;
    userName: string;
    content: string;
}

export const addDynamic = async (addMsg: addMsg) => {
    try {
        const response = await apiClient.post('/main/addDynamic', addMsg);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const removeDynamic = async (removeMsg: string) => {
    try {
        const response = await apiClient.delete(`/main/deleteDynamic/${removeMsg}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}