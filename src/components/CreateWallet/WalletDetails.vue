<template>
  <div class="center-fcol-card wallet-info">
    <div v-for="(key, index) in info" :key="index">
      {{ key.name }}:
      <textarea
        v-model="key.value"
        spellcheck="false"
        class="mnemonic-textarea"
      ></textarea>
      <i class="bi bi-info-circle-fill info-icon"></i>
    </div>
    <div class="btn-container">
      <p v-if="!isMnemonicGenerated">
        You currently do not have a wallet generated
      </p>
      <button
        class="btn"
        @click="saveWallet"
        v-if="!isWalletSaved && isMnemonicGenerated"
      >
        Save Wallet
      </button>
      <button
        class="btn choice-btn"
        v-if="isWalletSaved"
        @click="$router.push(`/playground/wallet/${store.wallets.length}`)"
      >
        View new wallet!
      </button>
      <button
        class="btn choice-btn"
        v-if="isWalletSaved"
        @click="$emit('reset-page')"
      >
        Generate another wallet?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWallets } from '@/stores/useWallets'
import { addressTypes } from '@/utils'
import { InfoType } from '@/utils'

const store = useWallets()

const emit = defineEmits<{
  (e: 'save-wallet'): void
  (e: 'reset-page'): void
}>()

const { info, mnemonic } = defineProps<{
  info: InfoType
  mnemonic: string
  isMnemonicGenerated: boolean
  isWalletSaved: boolean
}>()

function saveWallet() {
  emit('save-wallet')
  store.$patch((state) => {
    state.wallets.push(info.xprv.value)
    state.mnemonics.push(mnemonic)
    for (let type of addressTypes) {
      state.addresses[type].push('[]')
    }
  })
}

store.$subscribe((mutation, state) => {
  localStorage.setItem('xprv', JSON.stringify(state.wallets))
  localStorage.setItem('mnemonics', JSON.stringify(state.mnemonics))
  for (let type of addressTypes) {
    localStorage.setItem(type, JSON.stringify(state.addresses[type]))
  }
})
</script>

<style scoped>
.wallet-info {
  margin-bottom: 10px;
  height: 750px;
  gap: 15px;
  grid-column: 1/-1;
  width: auto;
}

.wallet-info > div {
  width: 300px;
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.info-icon {
  position: absolute;
  left: 40px;
  /* color: #486cfe; */
}

.info-icon:hover {
  /* add text bubble */
}

textarea {
  width: 100%;
  height: 90px;
  font-size: 14px;
}

.btn-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}

.btn {
  margin: 0;
}

.choice-btn {
  margin: 0;
  height: 50px;
  width: 100%;
}

@media only screen and (min-width: 800px) {
  .btn-container {
    max-height: 70px;
  }
  .wallet-info {
    height: 650px;
  }
  .wallet-info > div {
    width: 90%;
    flex-direction: row;
  }
  textarea {
    width: 480px;
    margin-left: auto;
  }
  .info-icon {
    bottom: 20px;
    left: 10px;
  }
}
</style>
