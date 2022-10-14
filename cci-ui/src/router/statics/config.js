/**
 * @description:前端动态路由
 * @return {*}
 */
export const asyncRouterMap = [
  {
    id: 'BASP',
    text: '组件示例',
    icon: '',
    leaf: false,
    expanded: true,
    children: [
      {
        id: 'DEMO',
        text: 'DEMO',
        icon: 'icon',
        leaf: true,
        nodeType: 2,
        expanded: true,
        children: [
          {
            id: 'QUERYTABLE',
            text: '搜索表格',
            leaf: true,
            url: '/example/CpQueryTable',
            nodeType: 2, // 2:页面 3:按钮
            children: [
              {
                id: 'BGXQ',
                text: '表格详情',
                leaf: true,
                url: '/example/CpQueryTable/ChildPageDetail',
                nodeType: 3 // 2:页面 3:按钮
              }
            ]
          }
        ]
      },
      {
        id: 'BASE_DEMO_4',
        text: '导航组件',
        icon: 'icon',
        leaf: false,
        expanded: true,
        children: [
          {
            id: 'YQ',
            text: '页签',
            leaf: true,
            url: '/baseComponent/tabs',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'BZT',
            text: '步骤条',
            leaf: true,
            url: '/baseComponent/steps',
            nodeType: 2 // 2:页面 3:按钮
          }
        ]
      },
      {
        id: 'BASE_DEMO',
        text: '数据展示组件',
        icon: 'icon',
        leaf: false,
        expanded: true,
        children: [
          {
            id: 'ZMD',
            text: '走马灯+气泡提示',
            leaf: true,
            url: '/baseComponent/carousel',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'TAGS',
            text: '标签',
            leaf: true,
            url: '/baseComponent/tags',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'ALERT',
            text: '提示',
            leaf: true,
            url: '/baseComponent/alert',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'TABLE',
            text: '表格+分页',
            leaf: true,
            url: '/baseComponent/table',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'TREE',
            text: '选择树',
            leaf: true,
            url: '/baseComponent/tree',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'SJX',
            text: '时间线',
            leaf: true,
            url: '/baseComponent/timeline',
            nodeType: 2 // 2:页面 3:按钮
          }
        ]
      },
      {
        id: 'BASE_DEMO_1',
        text: '视觉类',
        icon: 'icon',
        leaf: false,
        expanded: true,
        children: [
          {
            id: 'color',
            text: '颜色',
            leaf: true,
            url: '/baseComponent/color',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'font',
            text: '字体',
            leaf: true,
            url: '/baseComponent/font',
            nodeType: 2 // 2:页面 3:按钮
          }
        ]
      },
      {
        id: 'BASE_DEMO_2',
        text: '数据输入类',
        icon: 'icon',
        leaf: false,
        expanded: true,
        children: [
          {
            id: 'button',
            text: '按钮',
            leaf: true,
            url: '/baseComponent/button',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'input',
            text: '输入框',
            leaf: true,
            url: '/baseComponent/input',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'radio',
            text: '单选按钮',
            leaf: true,
            url: '/baseComponent/radio',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'checkbox',
            text: '多选按钮',
            leaf: true,
            url: '/baseComponent/checkbox',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'select',
            text: '下拉选择器',
            leaf: true,
            url: '/baseComponent/select',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'datePicker',
            text: '时间选择器',
            leaf: true,
            url: '/baseComponent/datePicker',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'switch',
            text: '开关',
            leaf: true,
            url: '/baseComponent/switch',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'slider',
            text: '滑动条',
            leaf: true,
            url: '/baseComponent/slider',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'inputNumber',
            text: '数字输入',
            leaf: true,
            url: '/baseComponent/inputNumber',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'rate',
            text: '评分',
            leaf: true,
            url: '/baseComponent/rate',
            nodeType: 2 // 2:页面 3:按钮
          },
          {
            id: 'button',
            text: '表单',
            leaf: true,
            url: '/baseComponent/form',
            nodeType: 2 // 2:页面 3:按钮
          }
        ]
      }
    ]
  },
  {
    id: 'JS_YYWH',
    text: 'iframe加载',
    icon: '',
    leaf: false,
    expanded: true,
    nodeType: 1,
    url: '/iframe/http://10.12.107.48:8092/layout/',
    systemType: 0
  },
  {
    id: 'JS_YYWHZ',
    text: '外链加载',
    icon: '',
    leaf: false,
    expanded: true,
    nodeType: 1,
    url: 'http://10.12.107.126:7301',
    systemType: 0
  }
]
