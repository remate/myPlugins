import { mergeOptions } from "../util/index";
import { initAssetsRegisters } from './assets'
import { ASSETS_TYPE } from "./const";
export function initGlobalAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
    }
    let cid = 0
    Vue.extend = function (extendOptions) {
        const Sub = function VueComponent(options) {
            this._init(options)
        }
        Sub.cid = cid++
        Sub.prototype = Object.create(this.prototype)
        Sub.prototype.constructor = Sub
        Sub.options = mergeOptions(
            this.options,
            extendOptions
        )
        return Sub
    }
    ASSETS_TYPE.forEach(type => {
        Vue.options[type + 's'] = {}
    })
    Vue.options._base = Vue
    initAssetsRegisters(Vue)
}