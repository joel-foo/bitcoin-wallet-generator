<template>
  <div class="center-fcol-card textarea-container">
    <div class="select-containers">
      <div class="select-container">
        <label for="language">Select a language:</label>
        <select
          name="language"
          id="language"
          v-model="lang"
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
        <select name="length" id="length" v-model="len" class="mnemonic-select">
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
      :value="mnemonic"
      :class="[isInvalidMnemonic ? 'invalid' : '', 'mnemonic-textarea']"
      spellcheck="false"
    ></textarea>
    <button @click="$emit('select-language', [lang, len])" class="btn">
      Generate seed
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  languages: string[]
  mnemonic: string
  isInvalidMnemonic: boolean
}>()

const emit = defineEmits<{
  (e: 'select-language', value: (string | number)[]): void
}>()

const language = ref<string>('english')
const length = ref<number>(24)

const lang = computed({
  get() {
    return language.value
  },
  set(value: string) {
    language.value = value
  },
})

const len = computed({
  get() {
    return length.value
  },
  set(value: number) {
    length.value = value
  },
})
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
