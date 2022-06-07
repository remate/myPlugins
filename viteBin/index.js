const Koa = require('koa')
const serveStaticPlugin = require('./plugins/serveStaticPlugin')
const { moduleRewritePlugin } = require('./plugins/moduleRewritePlugin')
function createServer() {
    const app = new Koa()
    const root = process.cwd()
    // console.log(root)
    const context = {
        app,
        root
    }
    const resolvePlugins = [//插件的集合
        // 解析import 重写路径
        moduleRewritePlugin,
        // 实现平台服务的功能
        serveStaticPlugin
    ]
    resolvePlugins.forEach(plugin => plugin(context))
    return app
}
module.exports = createServer