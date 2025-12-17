# Keep-Alive 缓存方案设计文档

## 一、项目结构分析

### 当前项目特点
- **框架**: React 19 + React Router v7
- **状态管理**: Zustand
- **UI 库**: Ant Design
- **路由方式**: Hash Router
- **路由生成**: 动态路由生成（从后端菜单数据生成）

### 现有实现
项目已经有一个基础的 `KeepAliveOutlet` 组件，但功能较为简单：
- 使用 `useState` 管理缓存
- 简单的显示/隐藏逻辑
- 缺少配置和生命周期支持

## 二、设计方案

### 2.1 架构设计

```
┌─────────────────────────────────────────┐
│         KeepAliveOutlet                 │
│  (组件入口，处理路由缓存逻辑)            │
└──────────────┬──────────────────────────┘
               │
               ├──────────────────────────┐
               │                          │
               ▼                          ▼
    ┌──────────────────┐      ┌──────────────────┐
    │  keepAliveStore  │      │   useKeepAlive    │
    │  (状态管理)      │      │   (生命周期钩子)  │
    └──────────────────┘      └──────────────────┘
```

### 2.2 核心模块

#### 1. **keepAliveStore** (状态管理)
- 使用 Zustand 管理缓存状态
- 实现 LRU 算法（最近最少使用）
- 支持 include/exclude 配置
- 支持 max 最大缓存数量

**核心数据结构**:
```javascript
{
  cacheMap: Map<pathname, ReactElement>,  // 缓存的组件映射
  cacheList: string[],                     // 缓存路径列表（LRU顺序）
  config: {
    max: number,                           // 最大缓存数
    include: Array<string | RegExp>,       // 白名单
    exclude: Array<string | RegExp>        // 黑名单
  }
}
```

#### 2. **KeepAliveOutlet** (核心组件)
- 替换 React Router 的 `<Outlet />`
- 读取路由 `meta.keepAlive` 配置
- 管理组件的缓存和显示
- 使用 `display: none` 保持组件状态

**工作流程**:
```
路由变化 → 检查 meta.keepAlive → 检查 include/exclude → 
添加缓存 → LRU 管理 → 显示/隐藏组件
```

#### 3. **useKeepAlive** (生命周期钩子)
- 提供 `activated` 钩子（组件激活时）
- 提供 `deactivated` 钩子（组件失活时）
- 类似 Vue 的 keep-alive 生命周期

#### 4. **useKeepAliveControl** (控制方法)
- 提供手动控制缓存的方法
- `addCache`、`removeCache`、`clearCache` 等

### 2.3 路由集成

在路由生成时，将 `meta` 信息传递到路由的 `handle` 中：

```javascript
const route = {
    path: item.path,
    element: CompuFunc(item),
    handle: {
        meta: item.meta || {}  // 包含 keepAlive 配置
    }
}
```

## 三、功能特性

### 3.1 缓存控制方式

#### 方式 1: 路由级别配置（推荐）
```javascript
{
    path: '/config/config',
    meta: { 
        keepAlive: true  // 强制缓存
    }
}
```

#### 方式 2: 全局配置
```javascript
setConfig({
    include: ['/welcome', '/config'],  // 白名单
    exclude: ['/login', '/404'],       // 黑名单
    max: 10                             // 最多缓存10个
})
```

#### 优先级
```
路由 meta.keepAlive > exclude > include > 默认缓存
```

### 3.2 LRU 缓存算法

当缓存数量超过 `max` 时，自动移除最旧的缓存：

```javascript
// 访问顺序: A -> B -> C -> A -> D
// 当 max=3 时，移除 B（最旧）
```

### 3.3 生命周期支持

```javascript
useKeepAlive({
    activated: () => {
        // 组件激活时触发
        // 例如：刷新数据、恢复滚动位置
    },
    deactivated: () => {
        // 组件失活时触发
        // 例如：保存状态、暂停定时器
    }
})
```

## 四、实现细节

### 4.1 状态保持机制

使用 `display: none` 而非 `unmount` 来保持组件状态：
- ✅ 保持组件状态（state）
- ✅ 保持 DOM 状态
- ✅ 保持事件监听
- ✅ 保持定时器

### 4.2 性能优化

1. **使用 Map 存储**: O(1) 查找性能
2. **LRU 算法**: 自动清理旧缓存，防止内存泄漏
3. **条件渲染**: 只渲染缓存的组件
4. **useMemo**: 缓存计算结果

### 4.3 兼容性处理

- 支持动态路由参数
- 支持嵌套路由
- 支持路由懒加载
- 兼容 React Router v7

## 五、使用场景

### 场景 1: 列表页缓存
```javascript
// 列表页配置缓存，切换回来时保持滚动位置和筛选条件
{
    path: '/config/config',
    meta: { keepAlive: true }
}
```

### 场景 2: 表单页缓存
```javascript
// 表单页缓存，防止用户输入丢失
{
    path: '/config/config/add',
    meta: { keepAlive: true }
}
```

### 场景 3: 详情页不缓存
```javascript
// 详情页不缓存，每次进入都重新加载数据
{
    path: '/config/config/edit/:id',
    meta: { keepAlive: false }
}
```

## 六、与 Vue keep-alive 对比

| 特性 | Vue keep-alive | React KeepAlive (本方案) |
|------|---------------|-------------------------|
| 基础缓存 | ✅ | ✅ |
| include/exclude | ✅ | ✅ |
| max 限制 | ✅ | ✅ |
| activated 钩子 | ✅ | ✅ |
| deactivated 钩子 | ✅ | ✅ |
| 路由级别配置 | ❌ | ✅ (通过 meta) |
| LRU 算法 | ❌ | ✅ |

## 七、注意事项

1. **内存管理**: 建议设置合理的 `max` 值
2. **表单状态**: 缓存的组件会保持表单状态
3. **数据刷新**: 使用 `activated` 钩子刷新数据
4. **动态路由**: 参数变化会被视为不同路由
5. **嵌套路由**: 支持嵌套路由的缓存

## 八、未来优化方向

1. **持久化缓存**: 支持 localStorage 持久化
2. **缓存策略**: 支持更多缓存策略（FIFO、LFU等）
3. **性能监控**: 添加缓存命中率统计
4. **开发工具**: 提供缓存调试工具

