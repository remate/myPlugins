const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
module.exports = class htmlPlugin {
    constructor(options) {
        this.options = options
        // console.log('options', options)
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tap('htmlPlugin', (compilation) => {
            let result = fs.readFileSync(path.join(__dirname, this.options.template), 'utf-8')
            let $ = cheerio.load(result)
            Object.keys(compilation.assets).forEach(item => {
                $(`<script src="${item}"></script>`).appendTo('body')
            })
            $('title').text(this.options.title)
            // console.log(compilation.assets)
            fs.writeFileSync(path.join(process.cwd(), 'dist', this.options.filename), $.html())
            // console.log($.html())
        })
    }
}