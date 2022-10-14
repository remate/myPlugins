import Router from 'vue-router'
import { injectDefaultRoute } from '@cci/cp-frame-layout'
export function createRouter (layoutComponent) {
  return new Router({
    base: process.env.VUE_APP_BASEURL,
    mode: 'history',
    routes: [
      ...injectDefaultRoute(layoutComponent)
    ]
  })
}
