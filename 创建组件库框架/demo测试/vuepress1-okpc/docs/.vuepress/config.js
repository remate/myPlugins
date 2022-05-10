module.exports = {
  theme: '',
  title: 'ZCI组件库',
  description: 'ZCI组件库',
  base: '/',
  port: '8080',
  themeConfig: {
    nav: [ // 配置顶部导航栏
      {
        text: '首页',
        link: '/'//读取根目录readme
      },
      {
        text: '组件',
        link: '/comps/'//读取comps下的readme
      }
    ],
    sidebar: { // 配置侧边栏部分
      '/comps/': ['/comps/', '/comps/select.md']
    }
  },
  head: [],
  plugins: ['demo-container', 'demoblock-plus'], // 配置插件
  markdown: {}
}
