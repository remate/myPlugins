/*
 * @Author: zhoulf
 * @FilePath: /create-cm-cli-app/generators/templates/pc/src/store/modules/permission.js
 * @Date: 2021-12-20 19:51:37
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-21 11:29:27
 * @Description: 
 */
/** async-routerstore模块,该模式只会走本地的静态路由 */

import { asyncRouterMap } from '@/config/router.config'

import { authApi } from '@/api'

import { isTestMode } from '@/utils'

const state = {
  menu: []
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}
const actions = {
  GenerateRoutes1({ commit }, menu = []) {
    if (isTestMode) {
      return new Promise((resolve) => {
        commit('SET_MENU', asyncRouterMap)
        resolve()
      })
    } else {
      return new Promise((resolve) => {
        commit('SET_MENU', menu)
        resolve()
      })
    }
  },
  GenerateRoutes({ commit, getters }) {
    // TODO  这里没考虑好通过环境变量来引入不同的权限模块，手动注入打包手动该配置会有风险。所以先通过判断来区分路由的获取方式
    if (isTestMode) {
      return new Promise((resolve) => {
        commit('SET_MENU', asyncRouterMap)
        resolve()
      })
    } else {
      return new Promise((resolve, reject) => {
        authApi.getMenuInfo(getters.token, getters.userData.userId,getters.userData.deptId).then(res => {
          commit('SET_MENU', res.data)
          resolve()
        }).catch(err => reject(err))
      })
    }
  },
  /**
     * 清空路由菜单
     * @param commit
     * @constructor
     */
  RemoveRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_MENU', [])
      resolve()
    })
  }
}

export default {
// namespaced: true,
  state,
  mutations,
  actions
}
