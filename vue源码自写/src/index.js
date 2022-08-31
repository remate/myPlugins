import { initMixin } from "./init";
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";
function Vue(options) {
    //进行Vue的初始化操作
    this._init(options)
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
export default Vue
