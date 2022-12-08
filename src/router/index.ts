import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PrefCharts from '../views/PrefCharts.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'prefCharts',
        component: PrefCharts,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
