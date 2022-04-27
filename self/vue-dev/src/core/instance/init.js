/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this;
    // a uid
    vm._uid = uid++;

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    //如果是子组件会带有_isComponent:true,走这里
    //做了性能优化，因为动态枚举效率较低，所以直接将所有组件配置对象上的
    //属性放到vm.$options对象中，也就是配置属性的整合
    // 什么时候会创建子组件？
    /**
     * 1.Vue.component('comName',where)
     * 2.{components:{xxx}}
     */
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      //根组件的初始化
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }

    // 以上完成的配置的整合得到vm.$options
    vm._self = vm;
    // 初始化了组件的关系属性如$parent,$root,$children等
    initLifecycle(vm);
    //自定义事件的初始化
    initEvents(vm);
    // 解析组件的插槽信息，得到vm.$slots,生成vm.$createElement函数
    initRender(vm);

    /**
     * 在beforeCreate的之前主要是完成的关系属性的初始化例如$parent,$children,refs,root等
     * 解析插槽信息，得到$slots,解析处理函数，得到h函数
     * 初始化自定义事件
     */
    callHook(vm, "beforeCreate");
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  // 从构造函数上获取选项
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions//缓存的选项
    if (superOptions !== cachedSuperOptions) {
      // 说明已经发生变化
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
