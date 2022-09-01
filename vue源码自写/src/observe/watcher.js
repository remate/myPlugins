import { pushTarget, popTarget } from "./dep.js";
import { queueWatcher } from "./schedular";
let id = 0
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm
        this.callback = callback
        this.options = options
        this.id = id++
        this.getter = exprOrFn//将内部传过来的回调函数放到getter上
        this.depsId = new Set()
        this.deps = []
        this.get()//调用get方法，会让渲染执行
    }
    addDep(dep) {
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id)//保存depid，用来判重
            this.deps.push(dep)//保存dep
            dep.addSub(this)//这个不需要判重，因为dep没存过这个watcher的话，watcher肯定也没存过这个dep
        }

    }
    get() {
        pushTarget(this)//把watcher存起来
        this.getter()//渲染watcher执行//  执行vm._update(vm._render()) 
        popTarget()//移除watcher
    }
    update() {
        // this.get()
        queueWatcher(this)
    }
    run() {
        this.get()
    }
}

export default Watcher