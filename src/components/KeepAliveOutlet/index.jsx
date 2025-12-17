import { useOutlet, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
export default function KeepAliveOutlet() {
    const outlet = useOutlet()
    const location = useLocation()
    const [aliveComponents, setAliveComponents] = useState({})
    const activeKey = useMemo(() => location.pathname, [location.pathname])

    // 当路由或 outlet 变化时，更新缓存
    useEffect(() => {
        if (!outlet) return

        setAliveComponents((pre) => {
            // 如果已缓存，更新缓存中的组件（确保是最新的）
            if (pre[activeKey]) {
                return {
                    ...pre,
                    [activeKey]: outlet
                }
            }
            // 如果未缓存，添加新缓存
            return {
                ...pre,
                [activeKey]: outlet
            }
        })
    }, [activeKey, outlet])

    // 获取当前应该显示的内容：优先使用缓存，如果未缓存且 outlet 存在则使用 outlet
    const currentElement = useMemo(() => {
        // 优先使用缓存，避免闪烁
        if (aliveComponents[activeKey]) {
            return aliveComponents[activeKey]
        }
        // 如果未缓存但 outlet 存在，使用 outlet
        if (outlet) {
            return outlet
        }
        // 如果都没有，返回 null（不应该发生）
        return null
    }, [activeKey, outlet, aliveComponents])

    return (
        <>
            {/* 渲染所有缓存的组件（隐藏非激活的） */}
            {Object.entries(aliveComponents).map(([path, element]) => {
                if (path === activeKey) return null // 当前激活的路由单独渲染
                return <div key={path} style={{ display: 'none' }}>{element}</div>
            })}
            {/* 渲染当前激活的路由 */}
            {currentElement && <div key={activeKey}>{currentElement}</div>}
        </>
    )
}