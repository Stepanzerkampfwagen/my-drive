import { createWebHistory, createRouter } from "vue-router"
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import Dashboard from "@/pages/Dashboard.vue"

const routes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/", redirect: "/login" },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
    if (to.name === "Dashboard" && !token) next('/login')
    next()
})