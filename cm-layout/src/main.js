/*
 * @Author: zhoulf
 * @FilePath: /create-cm-cli-app/generators/templates/pc/src/main.js
 * @Date: 2021-12-20 19:51:37
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-21 11:35:36
 * @Description: 
 */
import Vue from 'vue'
import './core/use'
import bootstrap from './core/bootstrap'
import router from '@/router'
import store from '@/store'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import { initPermissionInstance, AuthType } from './permission-factory'

initPermissionInstance(AuthType.TC1)

new Vue({
  el: '#app',
  router,
  store,
  created: bootstrap,
  render: h => h('div', { attrs: { id: 'app' }}, [h('router-view')])
})
