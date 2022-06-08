import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect:'/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home.vue')
        },
        {
            path: '/names',
            name: 'names',
            component: () => import('@/views/names.vue')
        },
        {
            path: '/frame',
            name: 'frame',
            component: () => import('@/views/frame.vue')
        }
    ]
})
export default router