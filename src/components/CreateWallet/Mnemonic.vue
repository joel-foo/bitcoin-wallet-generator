<template>
  <div class="center-fcol-card textarea-container">
    <div class="select-containers">
      <div class="select-container">
        <label for="language">Select a language:</label>
        <select
          name="language"
          id="language"
          v-model="selectedLanguage"
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
      </div>
      <div class="select-container">
        <label for="length">Select a length:</label>
        <select
          name="length"
          id="length"
          v-model="selectedLength"
          class="mnemonic-select"
        >
          <option
            v-for="(length, index) in [12, 15, 18, 21, 24]"
            :key="index"
            :value="length"
          >
            {{ length }}
          </option>
        </select>
      </div>
    </div>
    <textarea
      name="mnemonic"
      id="mnemonic"
      cols="40"
      rows="3"
      v-model="mnemonic"
      :class="[isInvalidMnemonic ? 'invalid' : '', 'mnemonic-textarea']"
      spellcheck="false"
    ></textarea>
    <button
      @click="$emit('select-language', [selectedLanguage, selectedLength])"
      class="btn"
    >
      Generate seed
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  (e: 'select-language', value: string[]): void
}>()

defineProps<{
  selectedLanguage: string
  languages: string[]
  selectedLength: number
  mnemonic: string
  isInvalidMnemonic: boolean
}>()
</script>

<style scoped>
.select-containers {
  display: flex;
}

textarea.invalid {
  border: 1px solid transparent;
  outline: 1px solid red;
}
</style>
