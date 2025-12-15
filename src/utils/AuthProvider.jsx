import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    return <>
        {loading && <Spin size="large" />}
        <AuthContext.Provider value={{ loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    </>
}
export const useAuth = () => useContext(AuthContext)