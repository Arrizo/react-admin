import request from '../request'

// 活动配置相关接口
export const apiActivityConfigList = (params) => {
    return request.get('/admin/activity/config', { params })
}

// 运营商灰度相关接口
export const apiAgencyGrayList = (params) => {
    return request.get('/admin/activity/agencyGray', { params })
}

// 活动模板相关接口
export const apiActivityTemplateList = (params) => {
    return request.get('/admin/activity/template', { params })
}
