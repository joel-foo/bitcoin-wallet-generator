<template>
  <section>
    <div class="grid">
      <div class="action" @click="$router.push(`/playground/create-wallet`)">
        Create a wallet!
        <i class="bi bi-hammer icon"></i>
      </div>
      <div class="action" @click="$router.push(`/playground/wallets`)">
        View exisiting wallets
        <i class="bi bi-wallet2 icon"></i>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/assets/styles/general';

.grid {
  display: grid;
  gap: 10px;
}
.action {
  @include flex-col-center;
  width: 90vw;
  height: 300px;
  background-color: #486cfe;
  color: white;
  /* color: #feda48; */
  font-weight: bold;
  gap: 20px;
  border-radius: 5px;
}

.action:hover {
  cursor: pointer;
}
.action:hover .icon {
  color: #feda48;
}
.icon {
  font-size: 50px;
}
@media only screen and (min-width: 800px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .action {
    width: 45vw;
    max-width: 450px;
  }
}
</style>
