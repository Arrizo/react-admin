import request from '../request'

// 附件相关接口
export const apiAttachmentList = (params) => {
    return request.get('/admin/dataCenter/attachment', { params })
}

// 字典相关接口
export const apiDictionaryList = (params) => {
    return request.get('/admin/dataCenter/dictionary', { params })
}

