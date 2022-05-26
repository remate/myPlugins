var path = require('path')
const webpack = require('webpack')

module.exports = {
    performance: {
        hints: false//防止报入口文件太大的错误
    },
    mode: 'development',//设置打包模式:开发、生产//production
    entry: {
        vue: [
            'vue/dist/vue.js',
            'vue-router'
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),//这里必须得是绝对路径，所以需要用到path.resolve来解析成绝对路径
        filename: '[name]_dll.js',//输出的文件名
        library:'[name]_dll'//会在全局暴露出一个vue_dll变量
    },
    plugins: [//添加插件
        new webpack.DllPlugin({
            name: '[name]_dll',
            path:path.resolve(__dirname,'../dist/manifest.json')
        })
    ]
}