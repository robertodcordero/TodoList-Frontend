<template>
  <section class="tasklist">
    <header>
      <h2>
        {{ model.id }} - {{ model.name }}
        <button
          type="button"
          class="btn btn-secondary"
          @click="newTaskHandler"
          v-t="'task.list.newTask'"
        ></button>
      </h2>
      <slot name="subheader"></slot>
    </header>
    <main>
      <slot name="pre-notes"></slot>
      <TransitionGroup name="fade">
        <div v-for="(task, key) in model.tasks" :key="key" class="min-w-[450px]">
          <TaskNote
            v-model:task="model.tasks[key]"
            @edit="editTask"
            @remove="removeTask"
          ></TaskNote>
        </div>
      </TransitionGroup>
      <slot name="post-notes"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <Teleport to="body">
      <Suspense>
        <Transition name="fade">
          <div v-show="addNewTask">
            <TaskEdit
              v-model:title="editTaskTitle"
              v-model:description="editTaskDescription"
              :action="actionTask"
              @accept="acceptTask"
              @cancel="cancelEditTaskHandler"
            ></TaskEdit>
          </div>
        </Transition>
      </Suspense>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import TaskNote from '@/components/TaskNote.vue'
import TaskEdit from '@/components/TaskEdit.vue'
import type { TaskList } from '@/types/taskList'

const model = defineModel<TaskList>('tasks', { required: true })

const nextId = computed(() => model.value.tasks.length + 1)
const addNewTask = ref(false)
const actionTask = ref<'add' | 'edit'>('add')
const editTaskId = ref(0)
const editTaskTitle = ref('')
const editTaskDescription = ref('')

const emit = defineEmits<{
  (e: 'preTaskCreated'): void
  (e: 'postTaskCreated'): void
  (e: 'preTaskEdited'): void
  (e: 'postTaskEdited'): void
}>()

const newTaskHandler = (): void => {
  actionTask.value = 'add'
  editTaskTitle.value = ''
  editTaskDescription.value = ''
  addNewTask.value = true
}

const cancelEditTaskHandler = (): void => {
  actionTask.value = 'add'
  addNewTask.value = false
  editTaskTitle.value = ''
  editTaskDescription.value = ''
}

const acceptTask = (): void => {
  addNewTask.value = false
  let editTask = undefined
  switch (actionTask.value) {
    case 'add':
      emit('preTaskCreated')
      model.value.tasks.push({
        id: nextId.value,
        title: editTaskTitle.value,
        description: editTaskDescription.value,
        ownerId: '',
        created: new Date(),
        isCompleted: false,
        isDeleted: false
      })
      emit('postTaskCreated')
      break
    case 'edit':
      emit('preTaskEdited')
      editTask = model.value.tasks.find((t) => t.id === editTaskId.value)
      if (editTask) {
        editTask.title = editTaskTitle.value
        editTask.description = editTaskDescription.value
      }
      emit('postTaskEdited')
      break
  }
  actionTask.value = 'add'
}

const editTask = (id: number): void => {
  const editTask = model.value.tasks.find((t) => t.id === id)
  if (editTask) {
    editTaskId.value = editTask.id
    editTaskTitle.value = editTask.title
    editTaskDescription.value = editTask.description
    actionTask.value = 'edit'
    addNewTask.value = true
  }
}

const removeTask = (id: number): void => {
  const removedTask = model.value.tasks.find((t) => t.id === id)
  if (removedTask) {
    removedTask.isDeleted = true
  }
}
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
