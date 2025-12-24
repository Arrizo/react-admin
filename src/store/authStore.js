import { create } from 'zustand'
import { getToken, setToken, clearToken } from '@/utils/token'
import { apiUserInfo, apiMenus } from '@/api/global'
export const useAuthStore = create(
    (set, get, store) => ({
        token: getToken(),
        userInfo: null,
        menus: [],
        permissions: ['config:config:add', 'config:config:edit'],
        setToken: (token) => {
            set({ token })
            setToken(token)
        },
        getUserInfo: async () => {
            const { code, data } = await apiUserInfo()
            code == 200 && set({ userInfo: data })
        },
        getMenus: async () => {
            const { code, data } = await apiMenus()
            code == 200 && set({ menus: data })

        },
        logout: () => {
            clearToken()
            set({ userInfo: null })
        },
        getPermission: () => { },
        hasPermission: (pers = []) => {
            try {
                if (!Array.isArray(pers)) throw ''
                return pers.some(i => get().permissions.includes(i))
            } catch (error) {
                return false
            }

        }
    }))