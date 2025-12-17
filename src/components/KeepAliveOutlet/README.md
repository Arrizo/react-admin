# KeepAlive 组件使用文档

类似 Vue 的 `keep-alive` 功能，用于缓存 React 路由组件，保持组件状态。

## 功能特性

1. ✅ **路由级别缓存控制** - 通过 `meta.keepAlive` 配置是否缓存
2. ✅ **include/exclude 配置** - 支持白名单和黑名单
3. ✅ **最大缓存数量** - 支持 LRU 算法，自动清理最旧的缓存
4. ✅ **生命周期钩子** - 支持 `activated` 和 `deactivated` 钩子
5. ✅ **状态保持** - 使用 `display: none` 保持组件状态

## 基础使用

### 1. 路由配置

在路由配置中通过 `meta.keepAlive` 控制是否缓存：

```javascript
// src/router/index.jsx
export const baseRoutes = [
    {
        path: '/welcome',
        component: '/welcome/index',
        meta: { 
            title: "首页", 
            keepAlive: true  // 启用缓存
        },
    },
    {
        path: '/config/config',
        component: '/config/config/index',
        meta: { 
            title: "配置管理",
            keepAlive: false  // 禁用缓存
        },
    },
]
```

### 2. 在组件中使用生命周期钩子

```javascript
// src/pages/welcome/index.jsx
import { useKeepAlive } from '@/hooks/useKeepAlive'

export default function Welcome() {
    // 使用生命周期钩子
    useKeepAlive({
        activated: () => {
            console.log('组件被激活，可以重新获取数据')
            // 例如：刷新列表数据
        },
        deactivated: () => {
            console.log('组件被失活，可以保存状态')
            // 例如：保存表单状态
        }
    })

    return <div>欢迎页面</div>
}
```

### 3. 全局配置

在应用初始化时配置 KeepAlive：

```javascript
// src/App.jsx
import { useEffect } from 'react'
import { useKeepAliveStore } from '@/store/keepAliveStore'

export default function App() {
    useEffect(() => {
        // 设置全局配置
        const { setConfig } = useKeepAliveStore.getState()
        setConfig({
            max: 10,  // 最多缓存 10 个路由
            include: ['/welcome', '/config'],  // 只缓存这些路由
            exclude: ['/login', '/404']  // 排除这些路由
        })
    }, [])

    // ... 其他代码
}
```

## 高级用法

### 1. 使用正则表达式

```javascript
setConfig({
    include: [/^\/config/, /^\/permission/],  // 缓存所有以 /config 或 /permission 开头的路由
    exclude: [/\/edit$/, /\/add$/]  // 排除所有以 /edit 或 /add 结尾的路由
})
```

### 2. 手动控制缓存

```javascript
import { useKeepAliveControl } from '@/hooks/useKeepAlive'

function MyComponent() {
    const { addCache, removeCache, clearCache, hasCache } = useKeepAliveControl()

    const handleClearCache = () => {
        // 清空所有缓存
        clearCache()
    }

    const handleRemoveCache = () => {
        // 移除指定路由的缓存
        removeCache('/welcome')
    }

    return (
        <div>
            <button onClick={handleClearCache}>清空缓存</button>
            <button onClick={handleRemoveCache}>移除首页缓存</button>
        </div>
    )
}
```

### 3. 检查缓存状态

```javascript
import { useKeepAliveControl } from '@/hooks/useKeepAlive'

function CacheStatus() {
    const { hasCache, getCacheList } = useKeepAliveControl()
    const cacheList = getCacheList()

    return (
        <div>
            <p>已缓存的路由：{cacheList.join(', ')}</p>
            <p>首页是否已缓存：{hasCache('/welcome') ? '是' : '否'}</p>
        </div>
    )
}
```

## 配置选项

### KeepAliveStore 配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| max | number | 0 | 最大缓存数量，0 表示不限制 |
| include | Array<string \| RegExp> | [] | 白名单，只缓存匹配的路由 |
| exclude | Array<string \| RegExp> | [] | 黑名单，不缓存匹配的路由 |

### 路由 meta 配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| keepAlive | boolean | undefined | true: 强制缓存, false: 强制不缓存, undefined: 使用全局配置 |

## 工作原理

1. **缓存机制**：使用 `Map` 存储缓存的组件，使用数组维护访问顺序（LRU）
2. **显示控制**：使用 `display: none` 隐藏非激活组件，保持 DOM 和组件状态
3. **优先级**：
   - 路由 `meta.keepAlive` 配置 > 全局 `include/exclude` 配置
   - `exclude` 优先级 > `include` 优先级

## 注意事项

1. **内存管理**：建议设置合理的 `max` 值，避免内存泄漏
2. **表单状态**：缓存的组件会保持表单状态，切换回来时数据不会丢失
3. **数据刷新**：使用 `activated` 钩子在组件激活时刷新数据
4. **动态路由**：动态路由参数变化时，会被视为不同的路由进行缓存

## 示例场景

### 场景 1：列表页缓存

```javascript
// 列表页配置缓存
{
    path: '/config/config',
    meta: { keepAlive: true }
}

// 列表页组件
function ConfigList() {
    const [list, setList] = useState([])

    useKeepAlive({
        activated: () => {
            // 激活时刷新列表
            fetchList()
        }
    })

    return <Table dataSource={list} />
}
```

### 场景 2：详情页不缓存

```javascript
// 详情页不缓存，每次进入都重新加载
{
    path: '/config/config/edit/:id',
    meta: { keepAlive: false }
}
```

### 场景 3：表单页缓存

```javascript
// 表单页缓存，保持用户输入
{
    path: '/config/config/add',
    meta: { keepAlive: true }
}

function AddForm() {
    const [formData, setFormData] = useState({})

    useKeepAlive({
        deactivated: () => {
            // 失活时保存表单到 localStorage
            localStorage.setItem('draft', JSON.stringify(formData))
        },
        activated: () => {
            // 激活时恢复表单
            const draft = localStorage.getItem('draft')
            if (draft) {
                setFormData(JSON.parse(draft))
            }
        }
    })

    return <Form>...</Form>
}
```

