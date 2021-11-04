## newbee-admin

## 启动

```bash
# 克隆项目
git clone git@gitee.com:violet-mio/newbee-admin.git

# 进入项目目录
cd newbee-admin

# 新建并切换到template分支
git checkout -b template origin/template

# 安装依赖
yarn

# 启动服务
yarn dev
```

## 访问

浏览器访问 [http://localhost:9233](http://localhost:9233)

> 提示：如果9233端口被占用，端口号根据命令行的实际情况为主


## 目录结构

```bash
├── mock                       # mock模拟数据
├── public                     # 静态资源 (会被直接复制)
│   |── favicon.ico            # favicon图标
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局组件
│   ├── directive              # 全局指令
│   ├── icons                  # svg 图标
│   ├── layout                 # 全局布局
│   ├── options                # 全局option选项
│   ├── plugins                # 第三方组件/插件(如elementui等)
│   ├── router                 # 路由
│   ├── store                  # 全局状态管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 工具方法
│   ├── views                  # 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.js          # 权限管理
│   ├── settings.js            # 设置文件
│   ├── mockProdServer.js      # mock服务
│   └── index.html             # html模板
├── .env.development           # 开发 环境变量配置
├── .env.staging               # 测试 环境变量配置
├── .env.production            # 生产 环境变量配置
├── .env.xxx                   # 环境变量配置
├── .prettierrc                # prettier 配置
├── jsconfig.json              # vscode智能提示相关
├── package.json               # package.json 依赖
└── vite.config.js             # vite 配置
```

## 构建

```bash
# 构建测试/预发布环境
yarn build:staging

# 构建生产环境
yarn build
```

## 接口地址

## 接口文档

## 其它
