## 该项目给新入门的开发者练手的react项目
## 基于useEffect实现动态路由的添加
## 使用zustand做状态管理器中心
## 并且对于表格有组件的封装，保证样式的统一和开发规范
## 表格入参使用useContext的方式注入，有效提高效率
## 自定义封装hooks-useRequest是在查询表格上更进一步简化
## Permission组件做按钮权限控制


## 基于vite+ant+react搭建的后台管理系统
# 安装依赖
pnpm install

# 本地启动
pnpm run dev

# 构建项目
pnpm run build



<!-- git 规范安装步骤 -->
## 1、执行pnpm install commitizen cz-customizable 安装git交互和自定义交互文本
## 2、新增.cz-config.js文件
## 3、在package.json的config配置如下：
###    "config": {
###    "commitizen": {
###      "path": "node_modules/cz-customizable"
###    },
###    "cz-customizable": {
###      "config": ".cz-config.cjs"
###    }
###  }

## 4、新增commitlint.config.cjs文件
## 5、pnpm install @commitlint/cli @commitlint/config-conventional husky
## 6、npx husky init（会生成 .husky 目录和 pre-commit 示例）
## 7、手动在 .husky/commit-msg 写入：npx --no-install commitlint --edit "$1"
## 8、在package.json中配置 "prepare": "husky install",
## 9、npx husky install



