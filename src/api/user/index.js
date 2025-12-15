import request from '../request'
import menusJson from '@/json/menus.json'
export const login = (form) => {
    return request.post('admin/passport/login', form)
}

export const apiMenus = async () => {
    await request.get('admin/permission/menus')
    return {
        code: 200,
        data: menusJson
    }
}
export const apiUserInfo = () => {
    return request.get('admin/passport/getInfo')
}
export const logout = (data) => {
    return request.post('admin/user', { data })
}
export const apiUserList = (params) => {
    return request.get('admin/user/list', { params: params })
}
export const apiUpload = (formDate) => {
    return request.post('admin/attachment/upload', formDate)
}
export const apiUserDelete = (ids) => {
    return request.delete('admin/user', { data: ids })
}
export const apiEditOrAddUser = (data) => {
    let url = data.id ? `admin/user/${data.id}` : 'admin/user'
    return request({
        method: data.id ? 'put' : 'post',
        data: data,
        url
    })
}