<template>
  <div class="home">
    <p>This is a client-side Bitcoin wallet generator.</p>
    <p>All private keys & mnemonics are stored client side.</p>
    <div class="bull">
      <img src="@/assets/images/bull.png" alt="bull" id="bull-img" />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.home {
  height: 100%;
  min-height: 100vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 26px;
}
.home p {
  margin: 20px 0 0;
}
a {
  color: black;
}

.github-icon:hover {
  cursor: pointer;
}

.bull {
  position: relative;
  width: 100%;
  max-width: 450px;
}

#bull-img {
  width: 100%;
}

footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  width: 100%;
}
@media screen and (max-width: 450px) {
  .home {
    font-size: 20px;
  }
}
</style>
