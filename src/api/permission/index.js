import request from '../request'

// 菜单相关接口
export const apiMenuList = (params) => {
    return request.get('/admin/permission/menu', { params })
}

// 角色相关接口
export const apiRoleList = (params) => {
    return request.get('/admin/permission/role', { params })
}

// 用户相关接口已在 user/index.js 中定义

