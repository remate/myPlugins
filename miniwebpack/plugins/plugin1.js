module.exports = class plugin1{
    apply(compiler){
        compiler.hooks.done.tap('plugin1',(stats)=>{
            console.log('done')
            console.log(stats)
        })
        compiler.hooks.emit.tap('plugin1', () => {
            console.log('emit')
        })
    }
}