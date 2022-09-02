import { isObject, isReservedTag } from "../util/index"

export function createElement(vm, tag, data = {}, ...children) {
    let key = data.key
    if (key) {
        delete data.key//key并不是data里的，是单独的，要删除
    }
    if (isReservedTag(tag)) {
        return vnode(tag, data, key, children, undefined)
    } else {
        let Ctor = vm.$options.components[tag]
        return createComponent(vm, tag, data, key, children, Ctor)
    }
}

function createComponent(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor)
    }
    data.hook = {
        init(vnode) {
            let child = vnode.componentInstance = new Ctor({ _isComponent: true })
            child.$mount()
        }
    }
    return vnode(`vue-component-${Ctor.cid}-${tag}`, data, key, undefined, { Ctor, children })
}

export function createTextNode(vm, text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text, componentOptions) {
    return {
        tag,
        data,
        key,
        children,
        text,
        componentOptions
    }
}
// 虚拟节点就是通过_c _v实现用对象来描述dom操作
// 将template转换成ast语法树》》》生成render方法》》》生成虚拟dom（其实就是执行render方法，进行变量的替换）》》》真实dom
// 重新生成虚拟dom》》》更新dom
// vnode = {
//     tag: 'div',
//     key: undefined,
//     data: {},
//     children: [],
//     text: undefined
// }