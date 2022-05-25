
const { merge } = require('webpack-merge')
var baseConfig = require('./webpack.base')
const webpack = require('webpack')
module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        open: true,//自动打开
        port: 3002,//端口号
        compress: true,//是否压缩
        hot: true,//是否热更新
        // static: './src'//webpack5//html的默认位置
        proxy: {
            '/api': 'http://localhost:9000',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: 'true'
        })
    ]
})
