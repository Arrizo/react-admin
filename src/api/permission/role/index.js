import request from '@/api/request'

export const apiRoleList = (params) => {
    return request.get('admin/role/list', { params })
}
export const apiGetRoleInfo = (id) => {
    return request.get(`admin/user/${id}/roles`)
}
export const apiUpdateRole = (id, data) => {
    return request.put(`admin/user/${id}/roles`, data)
}
