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
              <span>{{ t('task.edit.inputTitleLabel') }}<span class="text-red-700">*</span>: </span>
              <input
                type="text"
                :maxlength="128"
                :placeholder="t('task.edit.inputTitlePlaceholder')"
                :value="title"
                @change="(evt) => (title = evt.target.value)"
                ref="txtTitle"
              />
            </label>
          </div>
          <div>
            <label>
              <span
                >{{ t('task.edit.inputDescriptionLabel') }}<span class="text-red-700">*</span>:
              </span>
              <textarea
                :placeholder="t('task.edit.inputDescriptionPlaceholder')"
                :maxlength="256"
                :value="description"
                @change="(evt) => (description = evt.target.value)"
                ref="txtDescription"
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useValidate } from '@/composables/useValidate'
const { t } = useI18n()
const { setInvalid, setValid } = useValidate()

const title = defineModel<string>('title', { required: true })
const description = defineModel<string>('description', { required: true })

const txtTitle = ref<HTMLInputElement | null>(null)
const txtDescription = ref<HTMLTextAreaElement | null>(null)

const originalTitle = title.value
const originalDescription = description.value

const isTitleDirty = computed(() => originalTitle !== title.value)
const isDescriptionDirty = computed(() => originalDescription !== description.value)

defineProps<{
  action: 'add' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'accept'): void
  (e: 'cancel'): void
  (e: 'invalidate'): void
}>()

const validate = (): boolean => {
  let isValid: boolean = true

  if (title.value.length === 0) {
    setInvalid(txtTitle.value)
    isValid = false
  } else {
    setValid(txtTitle.value)
  }

  if (description.value.length === 0) {
    setInvalid(txtDescription.value)
    isValid = false
  } else {
    setValid(txtDescription.value)
  }

  return isValid
}

const acceptHandler = (): void => {
  const isValid = validate()
  if (isValid) {
    emit('accept')
  } else {
    emit('invalidate')
  }
}
</script>

<style scoped></style>
