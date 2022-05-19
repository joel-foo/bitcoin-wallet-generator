<template>
  <div class="wallet">
    <h2>Wallet {{ i }}</h2>
    <div>
      Extended private key: <textarea v-model="store.wallets[i - 1]"></textarea>
    </div>
    <div>
      Mnemonic:
      <textarea v-model="store.mnemonics[i - 1]"></textarea>
    </div>
    <button class="btn" @click="$router.push(`/wallet/${i}`)">
      View wallet
    </button>
    <i class="bi bi-trash trash-icon" @click="handleDelete(i - 1)"></i>
  </div>
</template>

<script setup lang="ts">
import { useWallets } from '../stores/useWallets'
import { addressTypes } from '@/utils'

defineProps<{ i: number }>()

const store = useWallets()

function handleDelete(index: number) {
  let isConfirmed = confirm(
    'Are you sure you want to delete this? This action is irreversible.'
  )
  if (!isConfirmed) {
    return
  }
  store.$patch((state) => {
    state.wallets = state.wallets.filter((_, i) => i !== index)
    state.mnemonics = state.mnemonics.filter((_, i) => i !== index)
    for (let type of addressTypes) {
      state.addresses[type] = state.addresses[type].filter(
        (_, i) => i !== index
      )
    }
  })
}

store.$subscribe((mutation, state) => {
  localStorage.setItem('xprv', JSON.stringify(state.wallets))
  localStorage.setItem('mnemonics', JSON.stringify(state.mnemonics))
})
</script>

<style scoped>
.wallet {
  width: 90vw;
  display: flex;
  flex-direction: column;
  height: 450px;
  border-radius: 3px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 18px;
  gap: 10px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  margin-top: 30px;
}

.wallet > div {
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  position: relative;
}

textarea {
  min-width: 75%;
  height: 100%;
  margin-left: auto;
  font-family: inherit;
  font-size: inherit;
  resize: none;
  padding: 10px;
}

textarea:focus {
  outline: 0;
}

.trash-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

.trash-icon:hover {
  cursor: pointer;
}

.btn {
  font-size: inherit;
}

@media only screen and (max-width: 450px) {
  .wallet {
    font-size: 14px;
  }
}
</style>
