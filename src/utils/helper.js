
/**
 * 获取父级和当前的路径key
 */
export const getOpenKeys = (menuTree, targetPath, result = []) => {
    for (const item of menuTree) {
        // 添加当前节点的 path
        const currentResult = [...result, item.path];

        // 如果当前节点就是要找的目标
        if (item.path === targetPath) {
            return currentResult;
        }

        // 如果有子节点，递归查找
        if (item.children && item.children.length > 0) {
            const found = getOpenKeys(item.children, targetPath, currentResult);
            if (found) {
                return found;
            }
        }
    }

    return null; // 没有找到
}
