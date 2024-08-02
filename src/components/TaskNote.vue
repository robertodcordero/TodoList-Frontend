<template>
  <article
    class="card"
    :class="{
      disabled: model.isDeleted
    }"
  >
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
      <button class="btn btn-primary" @click="edit(model.id)" v-t="'task.card.edit'"></button>
      <button class="btn btn-secondary" @click="remove(model.id)" v-t="'task.card.remove'"></button>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Task } from '@/types/task'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
