import request from '../request'

// 模板相关接口
export const apiTemplateList = (params) => {
    return request.get('/admin/config/template', { params })
}

export const apiTemplateRemote = (tempaltes) => {
    return request.post('/admin/config/template/remote', { data: { remoteOption: tempaltes } })
}

