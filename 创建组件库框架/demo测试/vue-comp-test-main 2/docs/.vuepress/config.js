module.exports = {
  title: 'test-component',
  description: 'test-component 组件库文档',
  markdown: {
    lineNumbers: true
  },
  base: '/vue-comp-test/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '测试组件',
      description: '这是国际化相关配置'
    },
    '/en/': {
      lang: 'en-US',
      title: 'test-component',
      description: 'this is locales config'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text: 'github',
            link: 'https://github.com'
          }
        ],
        sidebar: {
          '/guide/': [
            ['', '介绍'],
            {
              title: '组件',
              children: [
                ['../guide/Button.md', 'Button'],
                ['../guide/Card.md', 'Card']
              ]
            }
          ]
        }
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          {
            text: 'guide',
            link: '/en/guide/'
          },
          {
            text: 'github',
            link: 'https://github.com'
          }
        ],
        sidebar: {
          '/en/guide/': [
            ['', 'introduction'],
            {
              title: 'Components',
              children: [
                ['../guide/Button.md', 'Button'],
                ['../guide/Card.md', 'Card']
              ]
            }
          ]
        }
      }
    }
  },
  plugins: ['@vuepress/back-to-top']
};
