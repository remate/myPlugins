export function isObject(data) {
    return typeof data === 'object' && data !== null
}
export function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value
    })
}
const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'updated'
]
let strats = {}
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal]
        }
    } else {
        return parentVal
    }
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})


function mergeAssets(parentVal, childVal) {
    const res = Object.create(parentVal)
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res
}
strats.components = mergeAssets


export function mergeOptions(parent, child) {
    const options = {};
    for (let key in parent) {
        mergeField(key);
    }
    for (let key in child) {//如果child有
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    // 默认的合并策略，但有些属性树妖特殊的合并 例如生命周期
    function mergeField(key) {
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key])
        }
        if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] == null) {
            options[key] = parent[key]
        } else {
            options[key] = child[key]
        }
    }
    return options;
}

export function isReservedTag(tagName) {
    let str = 'p,div,span,input,button'
    let obj = {}
    str.split(',').forEach(tag => {
        obj[tag] = true
    })
    return obj[tagName]
}