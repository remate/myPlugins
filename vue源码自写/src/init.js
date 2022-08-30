import { initState } from "./state";
import { compileToFunction } from "./compiler/index";
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this
        vm.$options = options
        initState(vm)

        //如果用户传入了el属性，需要将页面渲染出来
        // 如果用户传入了el,就要实现挂载流程
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options
        el = document.querySelector(el)
        // render>template>el
        if (!options.render) {
            // 对模板进行编译
            let template = options.template
            if (!template && el) {
                template = el.outerHTML
            }
            const render = compileToFunction(template)
            // template也需要转化成render方法
            options.render = render
        }

    }
}