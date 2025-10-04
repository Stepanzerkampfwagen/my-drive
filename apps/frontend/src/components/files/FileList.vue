<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFiles, deleteFile } from '@/services/files'
import FileCard from './FileCard.vue'
import FileUpload from './FileUpload.vue'

interface FileItem {
  id: number
  filename: string
  url: string
}

const files = ref<FileItem[]>([])

const fetchFiles = async () => {
  files.value = await getFiles()
}

const handleDelete = async (id: number) => {
  await deleteFile(id)
  fetchFiles()
}

onMounted(fetchFiles)
</script>

<template>
  <div class="space-y-4">
    <FileUpload @uploaded="fetchFiles" />
    <div class="space-y-2">
      <FileCard
          v-for="file in files"
          :key="file.id"
          :file="file"
          @delete="handleDelete"
      />
    </div>
  </div>
</template>
