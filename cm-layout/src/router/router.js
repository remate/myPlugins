import Router from 'vue-router'
import { injectDefaultRoute } from '@cci/cm-admin-layout'
// import { constantRouterMap } from '../config/router.config'

export function createRouter(layoutComponent) {
  return new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
      ...injectDefaultRoute(layoutComponent)
      // 静态路由
      // ...constantRouterMap
    ]
  })
}
