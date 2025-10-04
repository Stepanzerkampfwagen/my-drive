<script setup lang="ts">
import { ref } from 'vue'
import { uploadFile } from '@/services/files'
import {Button} from "@/components/ui/button";

const selectedFile = ref<File | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  selectedFile.value = target.files?.[0] ?? null
}

const handleUpload = async () => {
  if (!selectedFile.value) return
  loading.value = true
  error.value = null
  success.value = false
  try {
    await uploadFile(selectedFile.value)
    success.value = true
    selectedFile.value = null
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Ошибка загрузки'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-2">
    <input type="file" @change="handleFileChange" />
    <Button @click="handleUpload" :disabled="loading || !selectedFile">Загрузить</Button>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="success" class="text-green-500">Файл успешно загружен!</p>
  </div>
</template>
