import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddUser from '../views/add.user.vue';
import Login from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';
import BookDetail from '../views/book.details.vue';
import AddBooks from '../views/addbooks.vue'; // Import AddBooks component

const routes: Array<RouteRecordRaw> = [
    { path: '/register', component: AddUser },
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (_to, _from, next) => {
            const token = localStorage.getItem('token');
            if (token) {
                next(); // Allow access to Dashboard
            } else {
                next('/login'); // Redirect to Login if no token
            }
        },
    },
    { path: '/books/:id', component: BookDetail },
    { path: '/add-book', component: AddBooks }, // Add route for AddBooks
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
