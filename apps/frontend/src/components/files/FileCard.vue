<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {Button} from "@/components/ui/button";

interface FileItem {
  id: number
  filename: string
  url: string
}

const props = defineProps<{ file: FileItem }>()
const emits = defineEmits<{ (e: 'delete', id: number): void }>()

const handleDelete = () => {
  emits('delete', props.file.id)
}
</script>

<template>
  <div class="flex items-center justify-between p-2 border rounded">
    <a :href="file.url" target="_blank" class="truncate">{{ file.filename }}</a>
    <Button @click="handleDelete" class="text-red-500">Удалить</Button>
  </div>
</template>
