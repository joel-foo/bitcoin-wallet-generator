<template>
  <div class="home">
    <p>This is a client-side Bitcoin wallet generator.</p>
    <p>All private keys & mnemonics are stored client side.</p>
    <div class="bull">
      <img src="@/assets/images/bull.png" alt="bull" id="bull-img" />
    </div>
    <footer>
      &copy; Created by Joel Foo
      <a
        href="https://github.com/joel-foo/bitcoin-wallet-generator"
        target="_blank"
      >
        <i class="bi bi-github github-icon"></i>
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 26px;
  width: 80vw;
}
.home p {
  margin: 20px 0 0;
}
footer {
  position: fixed;
  bottom: 10%;
}
a {
  color: black;
}
.github-icon:hover {
  cursor: pointer;
}

.bull {
  position: relative;
}

.bitcoin-logo {
  position: absolute;
  left: 50%;
  top: 30%;
  color: white;
  z-index: 999;
}

@media screen and (max-width: 450px) {
  .home {
    font-size: 20px;
  }
  #bull-img {
    width: 300px;
  }
}
</style>
