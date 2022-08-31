export function createElement(tag, data = {}, ...children) {
    let key = data.key
    if (key) {
        delete data.key//key并不是data里的，是单独的，要删除
    }
    return vnode(tag, data, key, children, undefined)
}
export function createTextNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}
function vnode(tag, data, key, children, text) {
    return {
        tag,
        data,
        key,
        children,
        text
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