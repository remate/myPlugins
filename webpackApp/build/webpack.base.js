var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    performance: {
        hints: false//防止报入口文件太大的错误
    },
    // mode: 'development',//设置打包模式:开发、生产//production
    entry: './src/main.js',//入口文件
    output: {
        path: path.join(__dirname, '..', './dist'),//这里必须得是绝对路径，所以需要用到path.resolve来解析成绝对路径
        filename: '[name].[contenthash:6].js'//输出的文件名
    },
    // watch:true
    // devServer: {
    //     open: true,//自动打开
    //     port: 3002,//端口号
    //     compress: true,//是否压缩
    //     hot: true,//是否热更新
    //     // static: './src'//webpack5//html的默认位置
    // },
    plugins: [//添加插件
        new HtmlWebpackPlugin({//这个时候可以去掉devserve里的static配置了
            filename: 'index.html',//打包名字
            template: './src/index.html'//根据这个模板生成html
        }),
        // new CleanWebpackPlugin(),//使用了dll后去掉

        new CopyWebpackPlugin(//版本为9.*
            {
                patterns: [
                    { from: path.join(__dirname, '..', 'assets'), to: "assets" },
                ],
            }
        ),
        // new webpack.BannerPlugin('**')//可以加入banner
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),//提取css
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dist/vue_dll.js'),
            publicPath: './',//不能少
        })

    ],

    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.css$/,//$表示以css结尾的
                // use: [MiniCssExtractPlugin.loader, 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,//$表示以less结尾的
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.s(a|c)ss$/,//$表示以sass/scss结尾的
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|bmp|gif)$/,//$表示以sass/scss结尾的
                use: {
                    loader: 'url-loader',//url-loader相比file-loader新增图片大小限制
                    options: {
                        limit: 2 * 1024,//url-loader功能，下面为file-loader功能
                        outputPath: 'images',
                        name: '[name]-[hash:4].[ext]',
                        esModule: false////webpack5已经弃用url和file-loader,如果webpack5还想使用,需要加
                    }
                },
                type: 'javascript/auto'//webpack5已经弃用url和file-loader,如果webpack5还想使用,需要加
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,//$表示以sass/scss结尾的
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'font',
                        esModule: false
                    }
                },
                type: 'javascript/auto'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    //省略到.babelrc
                    // options: {
                    //     presets: ['@babel/env'],//用于转换一些新的es6语法，比如箭头函数，但对象数组的一些新方法不会修改如includes,因此需要新增@babel/polyfill
                    //     plugins: [
                    //         '@babel/plugin-proposal-class-properties',//用于转换更高级的语法,例如class静态属性
                    //         '@babel/plugin-transform-runtime']//用于转换generator函数//同步安装@babel/runtime
                    // }
                },
                exclude: /node_modules/,
                // include://
            },
            // {
            //     test:/\.(htm||html)$)/i,
            //     loader:'html-withimg-loader'//仅处理html文件中的图片引用
            // },

        ]
    }
}