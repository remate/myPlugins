const koa = require('koa')
const serveStaticPlugin = require('./plugins/serveStaticPlugin')
function createServer() {
    const app = new koa()
    const root = process.cwd()
    console.log(root)
    const context = {
        app,
        root
    }
    const resolvePlugins = [//插件的集合
        // 解析import 重写路径
        // 实现平台服务的功能
        serveStaticPlugin
    ]
    resolvePlugins.forEach(plugin => plugin(context))
    return app
}
module.exports = createServer