<template>
  <div class="wallet">
    <h2>Wallet {{ i }}</h2>
    <i class="bi bi-pencil-square edit-icon" @click="editName"></i>
    <div class="info">
      <div>
        <p>Extended private key:</p>
        <textarea v-model="store.wallets[i - 1]"></textarea>
      </div>
      <div>
        <p>Mnemonic:</p>
        <textarea v-model="store.mnemonics[i - 1]"></textarea>
      </div>
    </div>
    <button class="btn" @click="$router.push(`/playground/wallet/${i}`)">
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

function editName() {}

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

<style lang="scss" scoped>
@import '@/assets/styles/general';

.wallet {
  width: 90vw;
  height: 450px;
  @include flex-col-center;
  position: relative;
  font-size: 16px;
  padding: 20px;
  gap: 10px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.info {
  width: 90%;
  max-width: 500px;
  @include flex-col-center;
  gap: 10px;
}

.info > div {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
}

p {
  width: 30%;
}

textarea {
  width: 60%;
  height: 100%;
  margin-left: auto;
  font-family: inherit;
  font-size: inherit;
  padding: 10px;
}
.edit-icon {
  position: absolute;
  top: 70px;
  right: 30%;
}

.trash-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

.trash-icon:hover,
.edit-icon:hover {
  color: #486cfe;
}

.btn {
  font-size: inherit;
}

@media only screen and (min-width: 800px) {
  .wallet {
    width: 45vw;
  }
}

@media only screen and (max-width: 450px) {
  .wallet {
    font-size: 14px;
  }
}
</style>
