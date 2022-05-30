const path = require('path')
const fs = require('fs')//读文件
const parser = require('@babel/parser')
const ejs = require('ejs')
const mkdirp = require('mkdirp');
const traverse = require('@babel/traverse').default//因为是es6模块导出的，所以添加default
const generator = require('@babel/generator').default//因为是es6模块导出的，所以添加default
const { SyncHook } = require('tapable')
class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.root = process.cwd()
        //初始化一个空对象，用来存放模块
        this.modules = {}
        this.rules = config.module.rules
        this.hooks = {
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            emit: new SyncHook(),
            afterEmit: new SyncHook(),
            done: new SyncHook(['modules']),//可用于传参
        }
        if (Array.isArray(this.config.plugins)) {
            this.config.plugins.forEach(plugin => plugin.apply(this))
        }
    }
    readSource(path) {
        return fs.readFileSync(path, 'utf-8')
    }
    depAnalyse(modulePath) {
        // console.log(modulePath)
        let source = this.readSource(modulePath)//获取入口文件的内容
        let handleLoader = (use, obj) => {
            let loaderPath = path.join(this.root, use)
            let loader = require(loaderPath)
            source = loader.call(obj, source)
        }
        for (let i = this.rules.length - 1; i >= 0; i--) {
            // console.log(this.rules[i])
            let { test, use } = this.rules[i]
            //这里值处理use 数组字符串类型（因为有多种，array string obj）
            if (test.test(modulePath)) {//满足文件匹配
                if (Array.isArray(use)) {
                    for (let j = use.length - 1; j >= 0; j--) {
                        // console.log(path.join(this.root, use[j]))//拿到loader的路径
                        handleLoader(use[j])
                        // let loaderPath = path.join(this.root, use[j])
                        // let loader = require(loaderPath)
                        // source = loader(source)
                    }
                } else if (typeof use == 'string') {
                    handleLoader(use)
                    // let loaderPath = path.join(this.root, use)
                    // let loader = require(loaderPath)
                    // source = loader(source)
                } else if (use instanceof Object) {
                    // console.log(use.options)
                    handleLoader(use.loader, {
                        query: use.options
                    })
                    // let loaderPath = path.join(this.root, use.loader)
                    // let loader = require(loaderPath)
                    // source = loader.call({
                    //     query: use.options
                    // }, source)
                }

            }
        }

        let dependenceies = []//保存依赖路径
        let ast = parser.parse(source)//如果有es6语法，需要新增sourceType属性，具体看官方文档
        // console.log(ast.program.body)
        traverse(ast, {//遍历语法树
            CallExpression(p) {
                // console.log(p.node.callee.name)
                if (p.node.callee.name === 'require') {
                    p.node.callee.name = '__webpack_require__'
                    let oldValue = p.node.arguments[0].value
                    oldValue = './' + path.join('./src', oldValue)//./加join里，结果没用，所以加外面
                    p.node.arguments[0].value = oldValue.replace(/\\+/g)//避免window出现反斜杠
                    dependenceies.push(p.node.arguments[0].value)
                    //递归加载所有依赖
                }
            }
        })
        let sourceCode = generator(ast).code
        // console.log(sourceCode)
        let modulePathRelative = './' + path.relative(this.root, modulePath)
        modulePathRelative = modulePathRelative.replace(/\\+/g)//避免window出现反斜杠
        this.modules[modulePathRelative] = sourceCode
        // console.log(sourceCode)
        dependenceies.forEach(dep => this.depAnalyse(path.resolve(this.root, dep)))
        // console.log(dependenceies)
    }
    async emitFile() {
        let template = this.readSource(path.join(__dirname, '../template/output.ejs'))
        let result = ejs.render(template, {
            entry: this.entry,
            modules: this.modules
        })
        // console.log(result)
        let outputPath = path.join(this.config.output.path, this.config.output.filename)
        // console.log(outputPath)
        await mkdirp(this.config.output.path);
        fs.writeFileSync(outputPath, result)
        this.tips()
    }
    tips() {
        // console.log('success')
        console.timeEnd('use')
        console.log('\x1b[33m%s\x1b[0m', '编译完成')
    }
    start() {
        //开始打包
        //依赖的分析
        this.hooks.compile.call()
        console.time('use')
        // __dirname只想pack工具compiler.js文件目录
        this.depAnalyse(path.resolve(this.root, this.entry))
        this.hooks.afterCompile.call()
        this.hooks.emit.call()
        this.emitFile()
        this.hooks.afterEmit.call()
        this.hooks.done.call(this.modules)
        // console.log(this.modules)
    }
}
module.exports = Compiler