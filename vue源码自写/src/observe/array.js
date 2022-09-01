let oldArrayMethods = Array.prototype
export let arrayMethods = Object.create(oldArrayMethods)
const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice']
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = oldArrayMethods[method].apply(this, args)//值还是原数组方法点位结果
        let inserted;
        let ob = this.__ob__;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    }
})