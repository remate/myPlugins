/*
 * @Author: zhoulf
 * @FilePath: /create-cm-cli-app/generators/templates/pc/src/permission-factory.js
 * @Date: 2021-12-20 19:51:37
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-21 11:36:14
 * @Description: 
 */
import store from '@/store'

/**
 * @Description: 根据类型创建不同的权限控制实例
 * @author tao.xie
 * @date 2021/8/27 5:13 下午
 */

const AuthType = {
  ONE: 'ONE', // 统一研发平台单点登陆
  TC: 'TC', // 三中心
  TC1: 'TC1' // 三中心自己部门对接逻辑由后端处理
}

import { PermissionTC } from './permission-tc'
import { PermissionOne } from './permission-one'
import { PermissionTC1 } from './permission-tc1'
import { isTestMode } from '@/utils'
import { addRoutes } from '@/router/generator-routers'

// import { innerRouter } from '@/config/router.innter'

/**
 * 创建权限模块实例
 * @param type
 * @returns {null}
 */
function initPermissionInstance(type) {
  // addInnerRoutes(innerRouter)
  // 测试模式，直接获取本地的静态路由
  if (isTestMode) {
    store.dispatch(type === AuthType.TC ? 'GenerateRoutes' : 'GenerateRoutes1').then(() => {
      addRoutes(store.getters.menu)
    })
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
      case AuthType.TC1: {
        instance = new PermissionTC1()
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
