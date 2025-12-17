import { useState, useMemo } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import { Layout, Menu, Button, Dropdown, Space, Avatar } from 'antd'
import { useAuthStore } from '@/store'
import Iconfont from '@/utils/iconUtils'
import { baseRoutes } from '@/router'
import { getOpenKeys } from '@/utils/helper'
import KeepAliveOutlet from '@/components/KeepAliveOutlet'
const { Sider, Header, Content } = Layout

import styles from './BasicLayout.module.less'

export default function Layouts() {
    const navigator = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const { menus, userInfo, logout } = useAuthStore()
    // 生成动态菜单
    const generateMenus = (menus) => {
        const generateMenu = (menuItems) => {
            const routes = [];
            menuItems.forEach(item => {
                if (item.path && !item.meta.hidden) {
                    const route = { key: item.path, icon: <Iconfont name='ContainerOutlined' />, label: item.meta.title }
                    if (item?.children?.length) { route.children = generateMenu(item.children) }
                    routes.push(route);
                }
            });
            return routes.length ? routes : null
        };
        return generateMenu(menus);
    };
    // 根据当前路由回溯所有父级 key，用于展开菜单
    // 选中的菜单key
    const defaultSelectedKeys = useMemo(() => [location.pathname], [location.pathname])
    // 展开的的菜单key
    const defaultOpenKeys = useMemo(() => {
        return getOpenKeys([...baseRoutes, ...menus] || [], location.pathname)
    }, [menus, location.pathname])
    // 动态生成的侧边菜单栏
    const memoMenus = useMemo(() => generateMenus([...baseRoutes, ...menus]) || [], [menus])
    const handleMenuClick = ({ key }) => {
        if (key == 'logout') {
            handleLogout()
        } else {
            navigator('/wec')
        }
    }
    const goto = (key) => {
        navigator(key)
    }
    const handleLogout = async () => {
        try {
            logout()
            navigator('/login')
        } catch (error) {

        }
    }
    //用户下拉菜单
    const items = [
        {
            key: 'userInfo',
            icon: <Iconfont name='UserOutlined' />,
            label: '个人中心'
        }, {
            key: 'logout',
            icon: <Iconfont name='UserOutlined' />,
            label: '退出登录'
        }
    ]
    return (
        <Layout className={styles.container} >
            <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
                <section className={styles.logo} >
                    <h2>{collapsed ? '物料' : '物料管理'}</h2>
                </section>
                <Menu mode="inline" theme='light' style={{ overflow: 'hidden auto' }} items={memoMenus} defaultOpenKeys={defaultOpenKeys} selectedKeys={defaultSelectedKeys} onClick={({ key }) => goto(key)}>
                </Menu>
            </Sider>
            <Layout  >
                <Header style={{ background: '#fff' }}>
                    <section className={styles.headerBar}>
                        <Button onClick={() => setCollapsed(!collapsed)} type='text' icon={collapsed ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />} ></Button>
                        <Dropdown menu={{ items, onClick: handleMenuClick }} placement='bottomRight'>
                            <Space>
                                <Avatar icon={<Icons.UserOutlined />}></Avatar >
                                <span>{userInfo?.username}</span>
                            </Space>
                        </Dropdown>
                    </section>

                </Header>
                <Content className={styles.content}>
                    {/* 使用该组件为了处理缓存问题 */}
                    {/* <KeepAliveOutlet /> */}
                    {/* 该方法不缓存 */}
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>

    )

}