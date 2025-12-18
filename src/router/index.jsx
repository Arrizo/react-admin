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
// 所有页面的引用
const pageModules = import.meta.glob('../pages/**/*.jsx');

/**
 * 当前方法会有如下报错或潜在问题：
 * 
 * 1. 懒加载组件 <Com /> 使用时，React 要求该组件必须包裹在 <Suspense> 组件内，否则会在运行时抛出错误。
 * 2. 路由组件渲染应直接返回 JSX 元素，并用 Suspense 配合懒加载；否则页面白屏或组件未加载。
 * 3. 原实现 Com ? <Com /> : null 判断其实没意义，因为 lazy 始终返回一个组件，除非出现路径错误，但这里应更加健壮。
 * 
 * 优化建议如下：
 * - 外部引入好 Suspense 的 fallback(loading)，包裹动态组件渲染，使渲染期间有 loading 状态；
 * - 保证 item.component 必须以 “/” 开头与路由结构一致。
 * - 避免直接渲染 null，可以抛出异常或警告。
 */

const CompuFunc = (item) => {
    if (!item.component) return null;
    const key = `../pages${item.component}.jsx`
    const importFn = pageModules[key]
    const Com = lazy(() => importFn());
    return (
        <Suspense fallback={<GlobalLoading />}>
            <Com />
        </Suspense>
    );
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
            element: <Suspense fallback={<div>loging....</div>} ><Navigate to={'/404'} replace ></Navigate></Suspense>
        },
        {
            path: '/',
            element: <Suspense fallback={<div>loading</div>} ><Navigate to={'/welcome'} replace ></Navigate></Suspense>
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