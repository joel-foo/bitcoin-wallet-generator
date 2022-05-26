<template>
  <h1>genie wallet</h1>
  <img src="@/assets/images/logo.png" alt="logo" id="logo-img" />
  <div class="grid-container">
    <div class="security">
      <i class="bi bi-lock-fill"></i>
      <h2>Secure</h2>
      <p>All keys are stored client-side</p>
    </div>
    <div class="security">
      <i class="bi bi-translate"></i>
      <h2>Universal</h2>
      <p>Support for a variety of seed phrase languages</p>
    </div>

    <div class="security">
      <i class="bi bi-key-fill"></i>
      <h2>Multisig</h2>
      <p>Multisig supported</p>
    </div>

    <div class="security">
      <i class="bi bi-git"></i>
      <h2>Open source</h2>
      <p>Complete transparency</p>
    </div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
h2,
p {
  margin: 0;
}
.grid-container {
  margin-top: 20px;
}

.grid-container > div i {
  color: #486cfe;
}

.grid-container > div p {
  width: 95%;
  font-size: 16px;
}

a {
  color: black;
  margin-left: 10px;
}

.github-icon:hover {
  cursor: pointer;
}

#logo-img {
  width: 300px;
  height: 300px;
}

footer {
  width: 250px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-container > div {
    width: 280px;
  }
  .grid-container > div p {
    width: 90%;
  }
}
@media screen and (min-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-container > div {
    width: 420px;
  }
}
</style>
