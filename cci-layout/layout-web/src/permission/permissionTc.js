/**
 * @Description: 对接了三中心权限判定模块
 */
import router from '../router'
import store from '@/store'
import { getQueryString } from '@/utils/url'
import { addRoutes } from '@/router/generatorRouters'
import { Message } from '@cci/cui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { appMutations } from '@cci/cp-frame-layout' // progress bar style

const code = getQueryString('code')
const projectId = getQueryString('projectId') // projectId
const idaastoken = getQueryString('idaastoken') // 统一认证平台的token
if (idaastoken) {
  store.commit('SET_IDAASTOKEN', idaastoken)
}
export class PermissionTC {
  constructor () {
    // 本地调试模式，不加路由守卫，只获取路由信息
    router.beforeEach((to, from, next) => {
      NProgress.start()
      // 本地有三中心的token
      if (store.getters.token) {
        if (store.getters.tokenValid) {
          // token检测有效
          next()
          NProgress.done()
        } else {
          // token没有检测,这种情况常见于刷新浏览器，因为token存储在sessionStorage中，而tokenValid不落地，所以刷新浏览器需要判断token是否有效
          store
            .dispatch('CheckAccessTokenValid', store.getters.token)
            .then(() => {
              // 保证用户信息存在且vue-router中路由信息存在
              this.getUserInfo().then(() => {
                next({ ...to })
                NProgress.done()
              })
            })
            .catch(() => {
              store
                .dispatch('RefreshToken')
                .then(() => {
                  this.getUserInfo(store.getters.menu).then(() => {
                    next({ ...to })
                    NProgress.done()
                  })
                })
                .catch(() => {
                  store.dispatch('Logout').then((url) => {
                    this.jumpToTcAuthUrl(url)
                  })
                })
            })
        }
      } else if (code) {
        // 连接上有三中心的code，获取accessToken
        store.dispatch('GetUserInfo', { code, projectId }).then((menu) => {
          // 登陆成功，获取用户信息及路由信息
          this.getUserInfo(menu).then((url) => {
            next(url)
            NProgress.done()
          })
        })
      } else {
        //  跳转到三中心的授权页面
        store.dispatch('Logout').then((url) => {
          this.jumpToTcAuthUrl(url)
        })
      }
    })
  }

  /**
   * 获取用户信息及菜单树
   * @param accessToken
   * @returns {Promise<string|string|*>}
   */
  async getUserInfo (menu = store.getters.menu) {
    try {
      // 获取用户信息
      await store.dispatch('GenerateRoutes', menu)
      // 保证vue-router中路由信息存在
      await this.getMenuInfo()
      // 解析可以跳转的第一条url
      return appMutations.getFirstFullPath() || '/home'
    } catch (e) {
      console.error(e)
      Message({
        type: 'error',
        message: '获取用户信息失败！'
      })
    }
  }

  /**
   * 保证vue-router中路由信息存在
   * @returns {Promise<void>}
   */
  async getMenuInfo () {
    // vuex中存在menu，那么直接添加到vue-router中
    if (store.getters.menu && store.getters.menu.length > 0) {
      addRoutes(store.getters.menu)
    } else {
      addRoutes([])
    }
  }

  /**
   * 跳转到三中心的授权页面
   */
  jumpToTcAuthUrl (url) {
    // window.location.href = process.env.VUE_APP_NAVIGATION_URL
    window.location.href = url
  }
}
