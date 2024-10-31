import axios, { AxiosInstance } from "axios";

/**
 * @description 登录接口调用
 */

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const toLogin = async () => {
    try {
        // const response = await apiClient.post();
    } catch (error) {
        throw error;
    }
}