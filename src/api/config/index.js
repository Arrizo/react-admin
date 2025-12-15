
import request from '../request'

export const apiConfigList = (params) => {
    return request.get('/admin/config/config', { params })
}
export const apiGetAgentLine = () => {
    return request.get('/admin/sundry/getAgentLine')
}
export const apiTemplateRemote = (tempaltes) => {
    return request.post('/admin/config/template/remote', { data: { remoteOption: tempaltes } })
}
export const apiConfigStatus = (id, status) => {
    return request.post(`/admin/config/config/${id}/status`, { status })
}
export const apiPublish = (data) => {
    return request.post(`/admin/config/config/publish`, { data })
}