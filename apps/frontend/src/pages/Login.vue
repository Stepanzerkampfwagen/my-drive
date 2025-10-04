<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { login } from "@/services/auth";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'vue-router'

// 1. Создаём схему Zod для логина
const loginSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6),
}))

// 2. Создаём форму
const form = useForm({
  validationSchema: loginSchema,
})

// 3. Обработчик сабмита
const router = useRouter()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const data = await login(values.email, values.password)
    console.log(data)
    await router.push("/dashboard")
  } catch (error) {
    console.error(error)
  }
  // Тут можно вызвать API NestJS: POST /auth/login
  // Например: const res = await api.login(values)
  // Если успех — router.push('/dashboard')
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form @submit="onSubmit" class="w-full max-w-sm p-6 bg-white rounded-xl shadow space-y-4">
      <h1 class="text-xl font-bold text-center">Login</h1>

      <!-- Email -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="your@email.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Password -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="******" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full">Login</Button>
      <p class="text-center text-sm text-gray-500">
        Нет аккаунта?
        <router-link to="/register" class="text-blue-600 hover:underline">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>
