<template>
  <div class="center-fcol-card textarea-container">
    <label for="mnemonic">Convert to another language:</label>
    <select
      name="language"
      id="language"
      v-model="newSelectedLanguage"
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
      v-model="convertedMnemonic"
      spellcheck="false"
      class="mnemonic-textarea"
    ></textarea>
    <button @click="$emit('convert-language', newSelectedLanguage)" class="btn">
      Convert seed
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'convert-language', value: string): void
}>()
defineProps<{
  newSelectedLanguage: string
  languages: string[]
  convertedMnemonic: string
}>()
</script>
