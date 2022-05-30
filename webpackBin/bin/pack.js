#!/usr/bin/env node
//上面指定运行环境为必须
const path = require('path')
//1.读取需要打包项目的配置文件
let config = require(path.resolve('webpack.config.js'))
let argv = process.argv;//可以读取命令参数配置
console.log('\x1b[33m%s\x1b[0m', 'config', argv[argv.length - 1])
//2.通过面向对象的方式来进行项目推进
const Compiler = require('../lib/compiler')
new Compiler(config).start()