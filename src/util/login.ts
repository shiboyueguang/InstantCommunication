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

let token: string = '';

export const toLogin = async (loginRequest: LoginRequestInterface) => {
    try {
        const response = await apiClient.post('/login/loginMain', loginRequest);
        token = response.data.token;
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

export const getUserName = async () => {
    try {
        const response = await apiClient.get(`/login/getUserName/${token}`);
        // console.log(token)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteGroupChat = async (groupName: string) => {
    try {
        await apiClient.delete(`/main/deleteChatGroupName/${groupName}`);
        return true;
    } catch (error) {
        console.error(error);
    }
}
interface addChat {
    groupName: string;
}
export const addGroupName = async (addMsg: addChat) => {
    try {
        await apiClient.post(`/main/addChatGroupName`, addMsg);
        return true;
    } catch (error) {
        console.error(error);
    }
}