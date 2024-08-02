<template>
  <div>
    <TaskList v-model:tasks="tasks" @newTask="newTaskHandler"></TaskList>
    <Teleport to="body">
      <Suspense>
        <Transition name="fade">
          <div v-show="addNewTask">
            <TaskEdit
              v-model:task="newTask"
              @accept="acceptTask"
              @cancel="cancelEditTaskHandler"
            ></TaskEdit>
          </div>
        </Transition>
      </Suspense>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Task } from './types/task'
import type { TaskList as Tasks } from './types/taskList'
import TaskList from './components/TaskList.vue'
import TaskEdit from './components/TaskEdit.vue'

const addNewTask = ref(false)

const newTask: Ref<Task> = ref({
  id: 3,
  title: '',
  description: '',
  ownerId: '',
  created: new Date(),
  isCompleted: false,
  isDeleted: false
})

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

const newTaskHandler = (): void => {
  newTask.value.id = 0
  newTask.value.title = ''
  newTask.value.description = ''

  addNewTask.value = true
}

const cancelEditTaskHandler = (): void => {
  addNewTask.value = false
}

const acceptTask = (task: Task): void => {
  addNewTask.value = false
  console.log(newTask)
  console.log(task)
  tasks.value.tasks.push(task)
}
</script>

<style scoped>
:root > div {
  @apply max-w-[1280px];
}

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
