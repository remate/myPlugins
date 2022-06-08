module.exports = {
    plugins: {
        autoprefixer: {
            //需要安装
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions", // 所有主流浏览器最近10版本⽤
            ],
            grid: true,
        },
        // 'postcss-pxtorem': {
        //     rootValue: 37.5,
        //     propList: ['*'],
        //     unitPrecision: 5
        // }
    }
}