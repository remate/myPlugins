const static = require('koa-static')
const path = require('path')
function serveStaticPlugin({ app, root }) {
    //vite在哪个目录，就以哪个目录启动静态服务
    app.use(static(root))
    // 以public作为静态服务
    app.use(static(path.join(root, 'public')))
}
module.exports = serveStaticPlugin