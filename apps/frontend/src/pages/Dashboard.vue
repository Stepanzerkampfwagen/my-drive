<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FileUpload from '@/components/files/FileUpload.vue'
import FileCard from '@/components/files/FileCard.vue'
import { getFiles, deleteFile } from '@/services/files'
import {Button} from "@/components/ui/button";

interface FileItem {
  id: number
  filename: string
  url: string
}

const router = useRouter()
const files = ref<FileItem[]>([])

// Проверяем токен при входе
const token = localStorage.getItem('token')
if (!token) router.push('/login')

// Загрузка файлов с сервера
const fetchFiles = async () => {
  try {
    files.value = await getFiles()
  } catch (err) {
    console.error(err)
  }
}

// Удаление файла
const handleDelete = async (id: number) => {
  try {
    await deleteFile(id)
    fetchFiles()
  } catch (err) {
    console.error(err)
  }
}

// Вызов при монтировании
onMounted(fetchFiles)

// Выход из аккаунта
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <Button @click="logout">Выйти</Button>
    </div>

    <FileUpload @uploaded="fetchFiles" />

    <div class="mt-4 space-y-2">
      <FileCard
          v-for="file in files"
          :key="file.id"
          :file="file"
          @delete="handleDelete"
      />
    </div>
  </div>
</template>
