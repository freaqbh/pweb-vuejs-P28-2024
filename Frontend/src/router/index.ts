import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddUser from '../views/add.user.vue';
import Login from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/register', component: AddUser },
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (_to, _from, next) => {
            const token = localStorage.getItem('token');
            if (token) {
                next(); // Lanjutkan ke Dashboard
            } else {
                next('/login'); // Arahkan ke Login jika tidak ada token
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
