import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { getToken } from '@/utils/token'
export default function AuthRoute({ children }) {
    const { logout, getUserInfo, getMenus, userInfo } = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()
    // 如果直接到登录页，不做检验
    if (location.pathname == '/login') {
        return children;
    }
    const checkAuth = async () => {
        if (!getToken()) {
            logout()
            navigate('/login', {
                replace: true,
                state: location.pathname
            })
            return
        }
        if (!userInfo) {
            try {
                await getUserInfo()
                await getMenus()
            } catch (error) {
                logout()
                navigate('/login', {
                    replace: true,
                    state: location.pathname
                })
            }
        }
    }
    useEffect(() => {
        // 没有登录的情况下
        checkAuth()
    }, [location.pathname])
    return children
}