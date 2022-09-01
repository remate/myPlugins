let id = 0;
class Dep {
    constructor() {
        this.id = id++
        this.subs = [];
    }
    depend() {
        // this.subs.push(Dep.target)
        Dep.target.addDep(this)
    }
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
    addSub(watcher){
        //这个不需要判重，因为dep没存过这个watcher的话，watcher肯定也没存过这个dep，在watcher里已经判重了
        this.subs.push(watcher)
    }
}
let stack = [];
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}
export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}
export default Dep