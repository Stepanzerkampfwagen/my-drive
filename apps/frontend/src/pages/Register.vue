<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { register } from "@/services/auth";

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

// 1️⃣ Схема регистрации
const registerSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
}))

// 2️⃣ Форма
const form = useForm({
  validationSchema: registerSchema,
})

// 3️⃣ Обработчик сабмита
const router = useRouter()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const data = await register(values.email, values.password);
    console.log(data);
    await router.push("/dashboard")
  } catch (error) {
    console.error(error)
  }
  // Тут вызов API NestJS: POST /auth/register
  // Например: await api.register(values)
  // Если успех -> router.push('/login')
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form @submit="onSubmit" class="w-full max-w-sm p-6 bg-white rounded-xl shadow space-y-4">
      <h1 class="text-xl font-bold text-center">Регистрация</h1>

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
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input type="password" placeholder="******" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Confirm Password -->
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Повторите пароль</FormLabel>
          <FormControl>
            <Input type="password" placeholder="******" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full">Зарегистрироваться</Button>

      <!-- Ссылка на Login -->
      <p class="text-center text-sm text-gray-500">
        Уже есть аккаунт?
        <router-link to="/login" class="text-blue-600 hover:underline">Войти</router-link>
      </p>
    </form>
  </div>
</template>
