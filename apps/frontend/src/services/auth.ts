import api from '@/api/api.ts'

export async function register (email: string, password: string) {
    const res = await api.post("/auth/register", {email, password})
    return res.data
}

export async function login (email: string, password: string) {
    const res = await api.post("/auth/login", {email, password})
    localStorage.setItem("token", res.data.accessToken)
    return res.data
}