import request from '../request'

// 定时任务相关接口
export const apiCrontabList = (params) => {
    return request.get('/admin/system/crontab', { params })
}

// 用户登录日志相关接口
export const apiUserLoginLogList = (params) => {
    return request.get('/admin/system/log/userLoginLog', { params })
}

// 用户操作日志相关接口
export const apiUserOperationList = (params) => {
    return request.get('/admin/system/log/userOperation', { params })
}

// 系统设置相关接口
export const apiSettingList = (params) => {
    return request.get('/admin/system/setting', { params })
}

