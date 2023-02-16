import router from '../router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { PermissionTC } from '@/permission/permissionTc'

export class PermissionOne extends PermissionTC {
  constructor () {
    super()
    router.beforeEach((to, from, next) => {
      NProgress.start()
      if (store.getters.token) {
        // 判定token是否过期及用户信息
        // 判定是否有路由信息
      } else {
        // 直接登录，带上当前的路由信息，保证登陆后能够回到登陆前的页面
        next({ path: '/login', query: { redirect: to.fullPath } })
        NProgress.done()
      }
    })
  }

  jumpToTcAuthUrl () {
    // TODO 跳转到登陆页
  }
}
