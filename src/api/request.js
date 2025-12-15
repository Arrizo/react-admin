import axios from 'axios'
import { message } from 'antd'
import { useAuthStore } from '@/store'

// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 5000,
})
request.interceptors.request.use(config => {
    const { token } = useAuthStore.getState()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
request.interceptors.response.use(response => {
    const { data } = response
    if (data.code != 200) {

        return Promise.reject(new Error(data.message || '请求失败'));
    }
    return data
}, error => {
    if (error.response) {
        const { status } = error.response
        switch (status) {
            case 401:
                message.error('登录已过期，请重新登录');
                useAuthStore.getState().logout();
                window.location.href = '/login';
            case 403:
                message.error('没有权限访问');
                break;
            case 404:
                message.error('请求的资源不存在');
                break;
            case 500:
                message.error('服务器内部错误');
                break;
            default:
                message.error('网络错误');
        }
    } else {
        message.error('网络连接失败')
    }

    return Promise.reject(error)
})
export default request