import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";
export function mountComponent(vm, el) {
    const options = vm.$options;
    vm.$el = el; //真实dom
    // 渲染页面
    // vm._render()方法通过解析render方法，渲染出虚拟dom
    // vm._update()通过虚拟dom创建真实的dom
    callHook(vm, 'beforeMount')
    let updateComponent = () => {//无论是渲染还是更新都会调用此方法
        vm._update(vm._render())
    }
    new Watcher(vm, updateComponent, () => { }, true)
    callHook(vm, 'mounted')
}
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        // 通过虚拟节点，渲染出真实dom
        const vm = this;
        vm.$el = patch(vm.$el, vnode)//需要用虚拟节点创建出真实节点，替换掉真实的$el
    }
}
export function callHook(vm, hook) {
    const handler = vm.$options[hook]
    if (handler) {
        for (let i = 0; i < handler.length; i++) {
            handler[i].call(vm);
        }
    }
}