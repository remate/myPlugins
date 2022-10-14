# cm-admin-base

## 介绍

- 城管PC端管理端脚手架项目，基于统一研发平台admin-base二次优化

## 依赖包

- vue-cli 3.x
- vue
- vue-router
- vuex
- cui [帮助文档](http://10.12.102.194:8070/index.html#/zh-CN/installation)
- scss
- axios

## 代码结构

```text

├── build/                               // 构建目录
│   └── node                             // node脚本
│   └── vue                              // vue资源       
│
├── plop-templates/                      // plop内建模版              
│
├── public                               // vue-cli 静态页面模板目录
│
├── src/                                 // 源码目录
│   ├── main.js                             // 项目入口 js 文件
│   ├── permission                        // 权限选择以及路由判断
│   ├── App.vue                             // 入口页面组件
│   ├── api/                                // api 接口目录
│   │   ├── login.js                        // 封装 login 相关接口请求
│   │   └── ...
│   ├── core/                                // plugin入口
│   ├── assets/                             // 资源目录
│   ├── components/                         // 公共组件目录
│   │   ├── example                              // tree 视图业务组件目录
│   │   │   └── src           
│   │   │   └── index.js                
│   ├── icons/                              // icon 目录
│   │   ├── index.js                          // 全局注册 svg icon 组件
│   │   └── svg/                              // svg 文件目录
│   │       ├── ...
│   │
│   ├── mixins/                             // 混入
│   ├── directive/                          // 指令 
│   ├── layout/                             // 页面框架目录
│   ├── router/                             // 路由目录
│   │   ├── index.js                          // 生成路由配置，并导出 router 实例
│   │   ├── statics                          // 本地静态路由
│   │   ├──generatorRouters                  // 动态路由处理
│   ├── store/                              // vuex
│   │   ├── index.js                         // 导出 vuex 实例
│   │   └── modules/                         // modules 目录
│   │       ├── app.js                         // app 模块
│   │       └── ...
│   ├── styles/                          // 样式目录
│   │   ├── cui.scss                        // 针对 cui 库样式
│   │   ├── index.scss                      // 一些全局样式
│   │   └── ...
│   ├── utils/                           // 工具函数目录
│   │   ├── index.js                        // 常规工具函数
│   │   └── ...
│   │
│   └── views/                           // 页面目录
│   │   ├── example                      // tree 视图业务组件目录
│   │   │   └── src           
│   │   │   │   └── component             // 视图组件相关的组件（可无）
│   │   │   │       └── ...               // 视图相关的组件
│   │   │   │   └── index.vue             // 视图页面
│   │   │   └── index.js                  // 视图入口
├── package.json                            // 项目依赖文件
├── .env                                    // 环境变量   
├── .eslintrc                                   // eslintrc
└── vue.config.js                           // 项目 vue webpack 配置文件

```

## 项目原型地址（如果有的话）

http://www.baidu.com

## 项目摹客地址（如果有的话）

http://www.baidu.com

## plop前端代码生成小工具

plop是一个基于generator的前端代码构建cli，能够灵活的定义配置并生成代码模版

### 目前支持的生成代码类型：

- store
- view
- 后续扩展...

### 运行方式:

终端运行```plop```命令，按提示操作即可

## Project setup

```
npm install  
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 其他注意事项

- xxxx
- xxxx
- xxxx
- xxxx
