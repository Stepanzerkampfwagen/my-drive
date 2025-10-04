import { createWebHistory, createRouter } from "vue-router"
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import Dashboard from "@/pages/Dashboard.vue"

const routes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    { path: "/", redirect: "/login" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
