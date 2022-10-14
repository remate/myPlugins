import { asyncRouterMap } from '@/router/statics/config'

import { isTestMode, isDevtMode } from '@/utils'

const state = {
  menu: []
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}
const actions = {
  /**
 * @description:获取权限
 */
  GenerateRoutes ({ commit }, menu = []) {
    if (isTestMode || isDevtMode) {
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
  /**
     * 清空路由菜单
     * @param commit
     * @constructor
     */
  RemoveRoutes ({ commit }) {
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
