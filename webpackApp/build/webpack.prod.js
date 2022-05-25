
const { merge } = require('webpack-merge')
var baseConfig = require('./webpack.base')
const webpack = require('webpack')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: 'false'
        })
    ],
    optimization: {
        minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
})
