/*
 * @Author: chase
 * @Date: 2025-08-06 14:32:19
 * @LastEditors: chase
 * @LastEditTime: 2025-11-03 20:39:50
 * @FilePath: \react\reacti-project\src\App.jsx
 * @Description: 
 * 
 */

// import { lazy } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from '@/router'
import { useMemo, useState, useEffect } from 'react'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { useAuthStore } from '@/store'
import { getToken } from '@/utils/token'
import './index.css'

export default function App() {
  const { menus, getUserInfo, getMenus, logout } = useAuthStore()
  const [ready, setReady] = useState(false)
  // 确保刷新的时候优先获取用户信息和路由
  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (getToken()) {
          await getUserInfo()
          await getMenus()
        }
      } catch (error) {
        logout()
      } finally {
        setReady(true)
      }
    }
    bootstrap()
  }, [])
  const memoRouter = useMemo(() => !ready ? null : createRouter(menus), [menus, ready])
  if (!memoRouter) {
    return (
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
        <Spin></Spin>
      </section>
    )
  }
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={memoRouter} />
    </ConfigProvider>
  )
}
