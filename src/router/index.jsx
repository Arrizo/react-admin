/*
 * @Author: chase
 * @Date: 2025-10-31 14:52:17
 * @LastEditors: chase
 * @LastEditTime: 2025-11-04 18:09:55
 * @FilePath: \react\reacti-project\src\router\index.jsx
 * @Description: 
 * 
 */
import { createHashRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AuthRoute from './authRoute'
const Login = lazy(() => import('@/pages/Login/index'))
const Layouts = lazy(() => import('@/Layouts/index'))
import GlobalLoading from '@/components/GlobalLoading'
const CompuFunc = (item) => {
    if (!item.component) return null
    const Com = lazy(() => import(`../pages${item.component}`))
    return Com ? <Com /> : null
}
// 生成动态菜单
const generateRoutes = (menus) => {
    const generateRoute = (menuItems) => {
        const routes = [];
        menuItems.forEach(item => {
            if (item.path) {
                const route = {
                    key: item.key,
                    path: item.path,
                    element: CompuFunc(item)
                }
                if (item?.children?.length) {
                    route.children = generateRoute(item.children);
                }
                routes.push(route);
            }
        });
        return routes.length ? routes : []
    };
    return generateRoute(menus)
};
// 基础公共组件
export const baseRoutes = [
    {
        path: '/404',
        component: '/NotFound/index',
        meta: { "hidden": true },
    },
    {
        path: '/welcome',
        component: '/welcome/index',
        meta: { "title": "首页", index: true },
    },
]

// 创建路由
export const createRouter = (dynamicRoutes = []) => {
    const routes = [
        {
            path: '/login',
            element: <Suspense fallback={<div>loging3333....</div>} ><Login></Login></Suspense>
        },
        {
            path: '*',
            element: <Suspense fallback={<div>loging111....</div>} ><Navigate to={'/404'} replace ></Navigate></Suspense>
        },
        {
            path: '/',
            element: <Suspense fallback={<div> loading</div>} ><Navigate to={'/welcome'} replace ></Navigate></Suspense>
        },
        {
            path: '/',
            element:
                <Suspense fallback={<GlobalLoading />} >
                    <AuthRoute>
                        <Layouts></Layouts>
                    </AuthRoute>
                </Suspense>,
            children: generateRoutes([...baseRoutes, ...dynamicRoutes])
        }

    ]
    return createHashRouter(routes)
}