module.exports = {
  name: 'comp-pro-v2',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/comp-pro-v2/',
    },
  },
  site: {
    title: '左左搭石塔',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮'
          },
          {
            path: 'buttons',
            title: 'buttons 按钮',
            hideSimulator: true // 只针对某个页面不显示
          }
        ],
      },
    ],
  },
};
