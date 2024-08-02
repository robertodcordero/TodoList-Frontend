<template>
  <div>
    <TaskList v-model:tasks="tasks"></TaskList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TaskList as Tasks } from './types/taskList'
import TaskList from './components/TaskList.vue'

const tasks: Ref<Tasks> = ref({
  id: 1,
  name: 'default list',
  tasks: [
    {
      id: 1,
      title: 'First Task',
      description: 'Task content',
      ownerId: '00001',
      created: new Date(),
      isCompleted: false,
      isDeleted: false
    },
    {
      id: 2,
      title: 'Second Task',
      description: 'Task content',
      ownerId: '00001',
      created: new Date(),
      isCompleted: false,
      isDeleted: false
    }
  ]
})
</script>

<style scoped>
:root > div {
  @apply max-w-[1280px];
}
</style>
