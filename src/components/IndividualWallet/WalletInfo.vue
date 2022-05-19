<template>
  <div class="main-card">
    <h1>Wallet {{ id + 1 }}</h1>
    <div class="container">
      <div>
        <p>Mnemonic:</p>
        <textarea v-model="mnemonic" readonly></textarea>
      </div>
      <div>
        <p>Extended Private Key:</p>
        <textarea v-model="xprv" readonly></textarea>
      </div>
      <div>
        <p>Extended Public Key:</p>
        <textarea v-model="xpub" readonly></textarea>
      </div>
      <div>
        <p>WIF:</p>
        <textarea v-model="wif" readonly></textarea>
      </div>
    </div>
    <i
      class="bi bi-arrow-down-square-fill arrow-down-icon"
      @click="scrollDown"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  id: number
  mnemonic: string
  xprv: string
  xpub: string
  wif: string
}>()
function scrollDown() {
  document
    .querySelector('.address-list')!
    .scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
h1 {
  margin: 0;
}
.container {
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 90%;
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-height: 450px;
}

.container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  width: 100%;
}

.container > div textarea {
  min-width: 60%;
  font-size: inherit;
  font-family: inherit;
  height: 90px;
  padding: 10px;
  resize: none;
}

.container > div p {
  margin-right: auto;
  max-width: 30%;
}

@media only screen and (min-width: 992px) {
  .arrow-down-icon {
    display: none;
  }
  .container > div textarea {
    height: 70px;
  }
}
</style>
