<template>
  <div class="modal-overlay">
    <div class="modal">
      <form>
        <fieldset>
          <legend
            v-t="action == 'add' ? 'task.edit.modalAddTitle' : 'task.edit.modalEditTitle'"
          ></legend>
          <div>
            <label>
              <span v-t="'task.edit.inputTitleLabel'"></span>
              <input
                type="text"
                :maxlength="128"
                :placeholder="t('task.edit.inputTitlePlaceholder')"
                :value="title"
                @change="(evt) => (title = evt.target.value)"
              />
            </label>
          </div>
          <div>
            <label>
              <span v-t="'task.edit.inputDescriptionLabel'"></span>
              <textarea
                :placeholder="t('task.edit.inputDescriptionPlaceholder')"
                :value="description"
                @change="(evt) => (description = evt.target.value)"
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

const title = defineModel<string>('title', { required: true })
const description = defineModel<string>('description', { required: true })

defineProps<{
  action: 'add' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'accept'): void
  (e: 'cancel'): void
}>()

const acceptHandler = (): void => {
  emit('accept')
}
</script>

<style scoped></style>
