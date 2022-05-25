import Vue from "vue/dist/vue.js";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const comp = {
    template: '<h2>12121</h2>'
}
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: comp
        }
    ]
})
var app = new Vue({
    el: '#app',
    router,
    data: {
        homeName: 'myHome'
    }
})

// import './css/a.css';
// import './css/b.scss';
// import './css/c.less';
// import { getUserInfo } from "./api/http";
// import moment from "moment";
// import 'moment/locale/zh-cn';
// moment.locale('zh-CN')
// // import $ from 'jquery'
// // console.log($)
// // setTimeout(() => {
// //     // console.log(12)
// // }, 2000);
// class Person {
//     constructor() {
//         console.log(1)
//     }
// }
// function* fn() {
//     yield 1;
//     yield 2;
//     return 3
// }
// let a = fn()
// // console.log(a.next())
// // console.log(a.next())
// // console.log(a.next())
// // console.log($)
// getUserInfo()
// console.log(moment().format('dddd'))
// // setTimeout(() => {
// //     inpor()
// // }, 4000);
// // function inpor(params) {
// //     import('jquery').then(({ default: $ }) => {
// //         $('body').addClass('BODIES')
// //     })
// // }