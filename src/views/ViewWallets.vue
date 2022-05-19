<template>
  <div v-if="store.wallets.length > 0">
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
