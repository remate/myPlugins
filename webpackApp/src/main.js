import Vue from "vue/dist/vue.js";//不用解析vue文件 直接html
import VueRouter from 'vue-router'
// import App from "./app.vue";
Vue.use(VueRouter)
const comp = {
    template: '<h2>page1</h2>'
}
const comp2 = {
    template: '<h2>page2</h2>'
}
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: comp
        },
        {
            path: '/work',
            component: comp2
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