<template>
  <article class="card">
    <header>
      <h3
        :class="{
          'line-through': model.isCompleted,
          italic: model.isCompleted
        }"
      >
        <input type="checkbox" :checked="model.isCompleted" @change="toggleTask()" />
        {{ model.title }}
      </h3>
    </header>
    <main>
      <p v-html="model.description"></p>
    </main>
    <footer>
      <button class="btn btn-primary" @click="edit(model.id)">Edit</button>
      <button class="btn btn-secondary" @click="remove(model.id)">Remove</button>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Task } from '@/types/task'

const model: Ref<Task> = defineModel<Task>('task', { required: true })

const emit = defineEmits<{
  (e: 'remove', id: number): void
  (e: 'edit', id: number): void
}>()

const remove = (id: number): void => {
  emit('remove', id)
}

const edit = (id: number): void => {
  emit('edit', id)
}

const toggleTask = () => {
  model.value.isCompleted = !model.value.isCompleted
}
</script>

<style scoped></style>
