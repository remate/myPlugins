# cci-admin

## 介绍

城云web端基础框架

## 文档相关
[cui]参照elementui，我们做了部分改动，使用时将el-改成c-
[cm-lib](http://10.12.107.126:7303)
[前端代码规范](https://www.yuque.com/docs/share/a39e3cfb-0b0d-416d-aac9-6e4db71f00ae?#)
## 优化点

- plop模版代码生成脚手架及模版
- layout：集成三中心统一layout布局
- 添加了husky代码提交规范
- eslint遵循公司前端代码规范
- 添加preview,build之后可以直接本地起一个服务
- 添加404页面
- 移除node-sass，使用dart-sas
- 移除生产环境使用cdn
- 移除easy-mock，统一采用yapi和自己项目后端约定好
- 移除前端对接三中心方案，统一采用后端对接三中心
## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

