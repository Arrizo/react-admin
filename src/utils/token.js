const KEY = 'token'

export const setToken = (token) => {
    localStorage.setItem(KEY, token)
}
export const getToken = () => {
    return localStorage.getItem(KEY) ?? ''
}
export const clearToken = () => {
    localStorage.removeItem(KEY)
}
export const isLogin = () => {
    return !!getToken()
}