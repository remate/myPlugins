const { defaultTheme } = require('@vuepress/theme-default')
const {
    path
} = require('@vuepress/utils')
module.exports = {
    theme: defaultTheme({
        navbar: [ // 配置顶部导航栏
            {
                text: '首页',
                link: '/'//读取根目录readme
            },
            {
                text: '组件',
                link: '/components/'//读取comps下的readme
            }
        ],
        sidebar: { // 配置侧边栏部分
            '/components/': [
                {
                    text: '安装',
                    link: '/components/',
                },
                {
                    text: 'Button',
                    link: '/components/Button',
                },
            ]
        }
    }),
    title: 'ZCI',
    description: 'ZCI',
    port: '8080',
    head: [],
    markdown: {},
    plugins: [
        [
            '@vuepress/plugin-register-components',
            {
                componentsDir: path.resolve(__dirname, './comp')
            }
        ],
        [
            'vuepress-plugin-demoblock-plus'
        ]
    ]
}