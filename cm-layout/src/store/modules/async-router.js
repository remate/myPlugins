/*
 * @Author: zhoulf
 * @FilePath: /create-cm-cli-app/generators/templates/pc/src/store/modules/async-router.js
 * @Date: 2021-12-20 19:51:37
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-21 11:30:28
 * @Description: 
 */
/** async-routerstore模块，该模式会走三中心的api模块去获取菜单树 */

import { authApi } from '@/api'

const state = {
  menu: []
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  GenerateRoutes({ commit, getters }) {
    return new Promise((resolve, reject) => {
      authApi.getMenuInfo(getters.token, getters.userData.userId,getters.userData.deptId).then(res => {
        commit('SET_MENU', res.data)
        resolve()
      }).catch(err => reject(err))
    })
  }
}

export default {
// namespaced: true,
  state,
  mutations,
  actions
}
