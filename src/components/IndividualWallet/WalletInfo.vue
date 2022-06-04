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

<style lang="scss" scoped>
@import '@/assets/styles/general';

.container {
  height: 80%;
  width: 100%;
  @include flex-col-center;
  max-height: 450px;
  gap: 10px;
  margin-top: 20px;
}

.container > div {
  @include flex-row-center;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  width: 100%;
  height: 100%;
  max-width: 600px;
}

.container > div textarea {
  width: 65%;
  font-size: inherit;
  font-family: inherit;
  padding: 10px;
  height: 100%;
}

.container > div p {
  margin-right: auto;
  width: 20%;
}

@media only screen and (min-width: 992px) {
  .arrow-down-icon {
    display: none;
  }
}
</style>
