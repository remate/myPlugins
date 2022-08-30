import { observe } from "./observe/index";
export function initState(vm) {
    const opts = vm.$options
    //vue的数据来源 属性 方法 数据 计算属性 watch
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethod(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}
function initProps(vm) { }
function initMethod(vm) { }
function initData(vm) {
    // console.log('初始化数据', vm.$options.data)
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    //对data对象进行劫持,即用户改变数据，可以得到通知，从而去刷新页面，数据驱动视图
    // 通过Object.defineProperty()
    observe(data)//响应式原理
}
function initComputed(vm) { }
function initWatch(vm) { }