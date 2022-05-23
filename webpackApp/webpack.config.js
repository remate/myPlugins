var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',//设置打包模式:开发、生产
    entry: './src/main.js',//入口文件
    output: {
        path: path.resolve('./dist'),//这里必须得是绝对路径，所以需要用到path.resolve来解析成绝对路径
        filename: 'bundle.js'//输出的文件名
    },
    // watch:true
    devServer: {
        open: true,//自动打开
        port: 3002,//端口号
        compress: true,//是否压缩
        hot: true,//是否热更新
        // static: './src'//webpack5//html的默认位置
    },
    plugins: [//添加插件
        new HtmlWebpackPlugin({//这个时候可以去掉devserve里的static配置了
            filename: 'index.html',//打包名字
            template: './src/index.html'//根据这个模板生成html
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,//$表示以css结尾的
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,//$表示以less结尾的
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.s(a|c)ss$/,//$表示以sass/scss结尾的
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|bmp|gif)$/,//$表示以sass/scss结尾的
                use: {
                    loader: 'url-loader',//url-loader相比file-loader新增图片大小限制
                    options: {
                        limit: 2 * 1024,
                        esModule: false////webpack5已经弃用url和file-loader,如果webpack5还想使用,需要加
                    }
                },
                type: 'javascript/auto'//webpack5已经弃用url和file-loader,如果webpack5还想使用,需要加
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,//$表示以sass/scss结尾的
                use: 'url-loader'
            }
        ]
    }
}