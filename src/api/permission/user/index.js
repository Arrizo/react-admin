import request from '@/api/request'

export const apiUserList = (params) => {
    return request.get('admin/user/list', { params: params })
}
export const apiUserDelete = (ids) => {
    return request.delete('admin/user', { data: ids })
}
export const apiUserReset = (id) => {
    return request.put('admin/user/password', { id })
}
export const apiEditOrAddUser = (data) => {
    let url = data.id ? `admin/user/${data.id}` : 'admin/user'
    return request({
        method: data.id ? 'put' : 'post',
        data: data,
        url
    })
}