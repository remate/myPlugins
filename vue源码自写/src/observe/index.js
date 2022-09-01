import { isObject, def } from "../util/index";
import { arrayMethods } from "./array.js";
import Dep from "../observe/dep";
class Observer {
    constructor(value) {
        // 如果数据层次过多，需要递归解析对象中的属性，一次增加set，get
        // value.__ob__ = this//不能通过这种方式定义
        // Object.defineProperty(value, '__ob__', {
        //     enumerable: false,
        //     configurable: false,
        //     value: this
        // })
        this.dep = new Dep()
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            // 如果是数组，并不会对索引进行观测，会造成性能问题
            value.__proto__ = arrayMethods
            // 但是如果数组里的值是对象的话，会进行监控
            this.observeArray(value)
            //数组的依赖收集通过 this.dep = new Dep()，到下面的 if (childOb) {childOb.dep.depend()}
        } else {
            this.walk(value)
        }
    }
    observeArray(data) {
        for (let i = 0; i < data.length; i++) {
            observe(data[i]);
        }
    }
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            defineReactive(data, key, data[key])//定义响应式
        });
    }
}
function defineReactive(data, key, value) {
    //如果二级层次也是对象也需要观测
    let dep = new Dep()//这里的dep是给对象使用的
    // 这个value可能是对象和可能是数组
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            console.log('取值:', key)
            //给每个属性都加自己的watcher，给每个属性都加个dep
            // 存起来 //刚开始一次渲染的时候回走render()也会取值，这时候就会有Dep.target，存起来
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return
            console.log(`setter:${value}值变为了${newValue}`)
            // 如果新设置的也为对象的情况，所以新设置也需要观测
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}
function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend()
        if (Array.isArray(current)) {
            dependArray(current)
        }
    }
}
export function observe(data) {
    //数据拦截，重新定义，不能兼容ie8及以下
    let isobj = isObject(data)
    if (!isobj) {
        return
    }
    // 数组也会 typeof 判断为 obj
    // 是对象进行观测
    return new Observer(data)

}