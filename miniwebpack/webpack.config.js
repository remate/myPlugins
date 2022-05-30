const path = require('path')
const plugin1 = require('./plugins/plugin1')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'//输出的文件名
    },
    plugins: [
        new plugin1(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: './loaders/loader1.js',
                    options: {
                        name: '前天'
                    }
                }
            }
        ]
    }
}