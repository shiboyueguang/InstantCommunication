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