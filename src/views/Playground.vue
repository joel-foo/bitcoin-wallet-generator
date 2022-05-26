<template>
  <div class="grid">
    <div class="action" @click="$router.push(`/create-wallet`)">
      Create a wallet!
      <i class="bi bi-hammer icon"></i>
    </div>
    <div class="action" @click="$router.push(`/wallets`)">
      View exisiting wallets
      <i class="bi bi-wallet2 icon"></i>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
}
.action {
  width: 90vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
