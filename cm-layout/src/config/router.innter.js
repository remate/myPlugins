/**
 *  内部路由，用于不在菜单树渲染的路由，如详情
 * @type {[{fullPath: string, meta: {activeMenu: string}, text: string, url: string}]}
 */
export const innerRouter = [
  {
    'url': '/home', // 路径，对应代码的路径
    'text': '首页', // 名称
    'meta': {
      'activeMenu': '/home' // 对应激活的页面路由
    }
  }
]
