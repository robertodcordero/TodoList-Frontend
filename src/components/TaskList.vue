<template>
  <section class="tasklist">
    <header>
      <h2>
        {{ model.id }} - {{ model.name }}
        <button type="button" class="btn btn-secondary" @click="emit('newTask')">New Task</button>
      </h2>
      <slot name="subheader"></slot>
    </header>
    <main>
      <slot name="pre-notes"></slot>
      <div v-for="(task, key) in model.tasks" :key="key" class="min-w-[450px]">
        <TaskNote
          v-model:task="model.tasks[key]"
          @remove="
            (id: number) => {
              console.log(id)
            }
          "
        ></TaskNote>
      </div>
      <slot name="post-notes"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import TaskNote from './TaskNote.vue'
import type { TaskList } from '@/types/taskList'

const model = defineModel<TaskList>('tasks', { required: true })
const emit = defineEmits<{
  (e: 'newTask'): void
}>()
</script>

<style scoped></style>
