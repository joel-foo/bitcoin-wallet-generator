<template>
  <section>
    <div v-if="store.wallets.length > 0" class="grid">
      <BriefWalletOverview v-for="i in store.wallets.length" :key="i" :i="i" />
    </div>
    <h1 v-else>You currently do not have any wallets</h1>
  </section>
</template>

<script setup lang="ts">
import { useWallets } from '../stores/useWallets'
import BriefWalletOverview from '../components/BriefWalletOverview.vue'
import { populateStore } from '@/utils'

const store = useWallets()

populateStore()
</script>

<style lang="scss" scoped>
@import '@/assets/styles/general';

.grid {
  align-items: unset;
  justify-content: unset;
  display: unset;
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
