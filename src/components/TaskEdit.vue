<template>
  <div class="modal-overlay">
    <div class="modal">
      <form>
        <fieldset>
          <legend v-t="'task.edit.modalTitle'"></legend>
          <div>
            <label>
              <span v-t="'task.edit.inputTitleLabel'"></span>
              <input
                type="text"
                :maxlength="128"
                :placeholder="t('task.edit.inputTitlePlaceholder')"
                :value="model.title"
                @change="(evt) => (model.title = evt.target.value)"
              />
            </label>
          </div>
          <div>
            <label>
              <span v-t="'task.edit.inputDescriptionLabel'"></span>
              <textarea
                :placeholder="t('task.edit.inputDescriptionPlaceholder')"
                :value="model.description"
                @change="(evt) => (model.description = evt.target.value)"
              ></textarea>
            </label>
          </div>
          <div>
            <button type="button" @click="acceptHandler" class="btn btn-primary">Accept</button>
            <button type="button" @click="emit('cancel')" class="btn btn-secondary">Cancel</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import type { Task } from '@/types/task'

const model = defineModel<Task>('task', { required: true })
const emit = defineEmits<{
  (e: 'accept', task: Task): void
  (e: 'cancel'): void
}>()

const acceptHandler = (): void => {
  emit('accept', {
    id: model.value.id,
    title: model.value.title,
    description: model.value.description,
    ownerId: '',
    created: new Date(),
    isCompleted: false,
    isDeleted: false
  })
}
</script>

<style scoped></style>
