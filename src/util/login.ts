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

export interface LoginRequestInterface {
    userName: string;
    password: string;
}

export const toLogin = async (loginRequest: LoginRequestInterface) => {
    try {
        const response = await axios.post('http://localhost:3000/login/loginMain', loginRequest);
        return response.data;
    } catch (error) {
        if (error.response) {
            // 服务器响应了状态码，但状态码超出了2xx的范围
            console.error('Server Error:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // 请求已发出，但未收到响应
            console.error('Network Error:', error.request);
        } else {
            // 其他错误
            console.error('Error:', error.message);
        }
        throw error;
    }
}