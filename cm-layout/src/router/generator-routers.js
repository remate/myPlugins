import { appMutations, appGetters, pageGetters } from '@cci/cm-admin-layout'

import router from './'

import layoutComponent from '../layout'

import { innerRouter } from '../config/router.innter'

// //递归实现
function treeToList(tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}

export const generateRoutes = () => {
  let items = treeToList(appGetters.menus).filter(i => i.url)

  // 连接内部路由
  items = items.concat(innerRouter)

  router.addRoutes([
    {
      path: '/',
      component: layoutComponent,
      redirect: items[0].fullPath || items[0].url,
      children: items.map(i => {
        return {
          path: i.fullPath || i.url,
          name: i.fullPath || i.url,
          component: i.url && i.url.indexOf(pageGetters.iframePrefix) === -1 ? resolve => require([`@/views${i.fullPath || i.url}/index.js`], resolve) : null,
          meta: i.meta
        }
      })
    }
  ])
}

export function addRoutes(menu) {
  appMutations.menus(menu)
  generateRoutes()
}
