import store from '@/store'

import { PermissionTC } from './permissionTc'
import { PermissionOne } from './permissionOne'
import { isTestMode, isDevtMode } from '@/utils'
import { addRoutes } from '@/router/generatorRouters'

const AuthType = {
  ONE: 'ONE', // 统一研发平台单点登陆
  TC: 'TC' // 三中心3.0用户体系使用者部门自己处理
}
/**
 * 创建权限模块实例
 * @param type
 * @returns {null}
 */
function initPermissionInstance (type) {
  // 开发/测试模式，直接获取本地的静态路由
  // 如果仅production为线上环境  则无需判断开发还是测试  判断  isPro  即可
  if (isDevtMode || isTestMode) {
    store.dispatch('GenerateRoutes').then(() => {
      addRoutes(store.getters.menu)
    })
    return true
  } else {
    let instance = null

    switch (type) {
    case AuthType.ONE: {
      instance = new PermissionOne()
      break
    }
    case AuthType.TC: {
      instance = new PermissionTC()
      break
    }
    }

    return instance
  }
}

export {
  initPermissionInstance,
  AuthType
}
