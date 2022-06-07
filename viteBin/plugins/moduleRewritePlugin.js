const {readBody} = require('./utils')
function moduleRewritePlugin({ app, root }) {
    app.use(async(ctx, next) => {
        console.log(11,next)
        await next()
        console.log(1)
        let content = await readBody(ctx.body)
        console.log(content)
    })
}
exports.moduleRewritePlugin = moduleRewritePlugin