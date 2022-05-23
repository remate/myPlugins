module.exports = {
  name: 'vantcli-demo',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/vantcli-demo/',
    },
  },
  site: {
    title: 'vantcli-demo',
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
            title: 'DemoButton 按钮',
          },
          {
            path: 'info-list',
            title: '标题信息展示',
            hideSimulator: true, // 只针对某个页面不显示
          },
        ],
      },
    ],
  },
};
