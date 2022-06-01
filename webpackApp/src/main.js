import Vue from "vue";//不用解析vue文件 直接html
import VueRouter from 'vue-router'
// import App from "./app.vue";
Vue.use(VueRouter)
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
// socket 连接参数
const socketOptions = {
    autoConnect: false,//是否自动连接
}
// 注册
Vue.use(
    new VueSocketIO({
        debug: true,  
        connection: SocketIO("http://localhost:3001", socketOptions),
    })
)

const comp = {
    template: '<h2>page1</h2>'
}
const comp2 = {
    template: '<h2>page2</h2>'
}
const page1 = () => import('./components/page1.vue');
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: page1
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
import { getUserInfo } from "./api/http";
getUserInfo()
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

// console.log(moment().format('dddd'))
// // setTimeout(() => {
// //     inpor()
// // }, 4000);
// // function inpor(params) {
// //     import('jquery').then(({ default: $ }) => {
// //         $('body').addClass('BODIES')
// //     })
// // }