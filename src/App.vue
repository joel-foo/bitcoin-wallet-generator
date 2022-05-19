<template>
  <i class="bi bi-list list-icon" @click="toggleSidebar"></i>
  <div :class="['navbar', isSidebarOpen ? 'open' : 'closed']">
    <i class="bi bi-x x-icon" @click="toggleSidebar"></i>
    <router-link to="/">Home</router-link>
    <router-link to="/create-wallet">Create a wallet!</router-link>
    <router-link to="/wallets">Wallets</router-link>
    <img
      id="bitcoin-nav"
      src="https://bitcoin.org/img/icons/logotop.svg?1651392467"
      alt=""
    />
    <!-- <router-link to="/utxo-checker">UTXO Checker</router-link> -->
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isSidebarOpen = ref(false)
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@200&family=Montserrat:wght@300;600&display=swap');

* {
  box-sizing: border-box;
}

body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  min-height: 100vh;
}

.navbar {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  z-index: 999;
  height: 100%;
  padding: 20px;
  width: 160px;
}

.navbar a,
.x-icon {
  display: block;
  margin-bottom: 40px;
  text-decoration: none;
  color: black;
}

.navbar a:hover {
  text-decoration: underline;
}

.list-icon,
.x-icon {
  font-size: 40px;
}

.list-icon {
  position: fixed;
  left: 10px;
  top: 0;
  z-index: 999;
}

.list-icon:hover,
.x-icon:hover {
  cursor: pointer;
}

.navbar.open {
  transform: translateX(0%);
  transition: transform 0.4s linear;
}

.navbar.closed {
  transform: translateX(-100%);
  transition: transform 0.4s linear;
}

#bitcoin-nav {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 100px;
}
</style>
