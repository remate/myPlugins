export function patch(oldVnode, vnode) {
    // console.log("old", oldVnode);
    // console.log("new", vnode);
    if (!oldVnode) {
        // 组件挂载
        return createElm(vnode)
    } else {
        const isRealElement = oldVnode.nodeType;
        if (isRealElement) {
            const oldElm = oldVnode;
            const parentElm = oldElm.parentNode;
            let el = createElm(vnode);
            parentElm.insertBefore(el, oldElm.nextSibling);
            parentElm.removeChild(oldElm);
            return el
        }
    }
}
function createComponent(vnode) {
    // 需要创建组件的实例
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) {
        i(vnode)
    }
    if (vnode.componentInstance) {
        return true
    }
}
function createElm(vnode) {
    let { tag, data, children, key, text } = vnode;
    if (typeof tag === "string") {
        //不是tag是字符串的那就是普通的html或者组件

        // 实例化组件
        if (createComponent(vnode)) {
            // 返回真实dom 
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag);
        updateProperties(vnode)
        children.forEach((child) => {
            return vnode.el.appendChild(createElm(child));
        });
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}
// 更新属性
function updateProperties(vnode) {
    let newProps = vnode.data;
    let el = vnode.el;
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
