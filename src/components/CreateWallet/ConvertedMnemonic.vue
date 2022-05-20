<template>
  <div class="center-fcol-card textarea-container">
    <label for="mnemonic">Convert to another language:</label>
    <select
      name="language"
      id="language"
      v-model="newLang"
      class="mnemonic-select"
    >
      <option
        v-for="(language, index) in languages"
        :key="index"
        :value="language"
      >
        {{ language }}
      </option>
    </select>
    <textarea
      name="convertedMnemonic"
      id="convertedMnemonic"
      cols="40"
      rows="3"
      :value="convertedMnemonic"
      spellcheck="false"
      class="mnemonic-textarea"
    ></textarea>
    <button @click="$emit('convert-language', newLang)" class="btn">
      Convert seed
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  languages: string[]
  convertedMnemonic: string
}>()

const emits = defineEmits<{
  (e: 'convert-language', value: string): void
}>()

const newLanguage = ref<string>('chinese_traditional')

const newLang = computed({
  get() {
    return newLanguage.value
  },
  set(value: string) {
    newLanguage.value = value
  },
})
</script>
