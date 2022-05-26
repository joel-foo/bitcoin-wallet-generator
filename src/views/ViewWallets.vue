<template>
  <div v-if="store.wallets.length > 0" class="grid">
    <BriefWalletOverview v-for="i in store.wallets.length" :key="i" :i="i" />
  </div>
  <h1 v-else>You currently have no wallets</h1>
</template>

<script setup lang="ts">
import { useWallets } from '../stores/useWallets'
import { onMounted } from 'vue'
import BriefWalletOverview from '../components/BriefWalletOverview.vue'
import { populateOnMount } from '@/utils'

const store = useWallets()

onMounted(() => {
  populateOnMount()
})
</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
  margin: 60px 0 30px;
}
@media only screen and (min-width: 800px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
