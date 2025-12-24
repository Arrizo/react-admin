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
export const apiUpload = (formDate) => {
    return request.post('admin/attachment/upload', formDate)
}