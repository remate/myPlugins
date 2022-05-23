import { authApi } from '@/api'

/** userstore模块 */
const state = {
  token: '', // 用户令牌
  userData: {}, // 用户信息
  refreshToken: '', // 刷新token
  idaastoken: '' // 统一认证token
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  },

  SET_USERDATA: (state, userData) => {
    state.userData = userData
  }, 
  SET_IDAASTOKEN: (state, token) => {
    state.idaastoken = token
  }
}

const actions = {
  /**
   * 登陆，根据三中心的code换取accessToken
   * @param commit
   * @param code
   * @returns {Promise<unknown>}
   * @constructor
   */
  Login({ commit }, code) {
    return new Promise((resolve, reject) => {
      authApi.getTokenByCode(code).then(res => {
        // access_token: "b05cb54a-157f-4e7a-8c25-dfceae57146e"
        // expires_in: 1799
        // refresh_token: "6c9e0bc2-29f9-4c13-8a47-23f8660d9e42"
        // scope: "11"
        // token_type: "bearer
        const accessToken = res.access_token
        const refreshToken = res.refresh_token
        commit('SET_TOKEN', accessToken)
        commit('SET_REFRESH_TOKEN', refreshToken)
        // 标记token有效
        commit('SET_TOKEN_VALID')
        resolve()
      }).catch(err => reject(err))
    })
  },

  /**
   * 刷新token
   * @param commit
   * @param state
   * @constructor
   */
  RefreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      authApi.refreshToken(state.refreshToken).then(res => {
        // access_token: "b05cb54a-157f-4e7a-8c25-dfceae57146e"
        // expires_in: 1799
        // refresh_token: "6c9e0bc2-29f9-4c13-8a47-23f8660d9e42"
        // scope: "11"
        // token_type: "bearer
        const accessToken = res.access_token
        const refreshToken = res.refresh_token
        commit('SET_TOKEN', accessToken)
        commit('SET_REFRESH_TOKEN', refreshToken)
        // 标记token有效
        commit('SET_TOKEN_VALID')
        resolve()
      }).catch(err => reject(err))
    })
  },

  /**
   * 获取用户信息
   * @param commit
   * @param accessToken
   * @returns {Promise<unknown>}
   * @constructor
   */
  GetUserInfo({ commit }, accessToken) {
    return new Promise((resolve, reject) => {
      authApi.getUserInfoByToken(accessToken).then(res => {
        commit('SET_USERDATA', res.data)
        commit('SET_TOKEN_VALID')
        commit('SET_USERDATA', res.data.user)
        resolve()
      }).catch(err => reject(err))
    })
  },
// GetUserInfo修改 因为有些同学模块使用了sessionStorage，所以就加了
GetUserInfo1({ commit }, params) {
  return new Promise((resolve, reject) => {
    authApi.getProjectFunsByCodeAndProjectId({ ...params }).then(res => {
      commit('SET_TOKEN', res.data.token.access_token)
      commit('SET_TOKEN_VALID')
      commit('SET_USERDATA', res.data.user)
      resolve(res.data.projectFuns)
    }).catch(err => reject(err))
  })
},
  /**
   * 退出登陆
   * @param commit
   * @param useLogoutApi
   * @constructor
   */
  Logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERDATA', {})
      resolve('/oauth2/logout')
    })
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}
