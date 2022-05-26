<template>
  <h1>download genie wallet</h1>
  <i
    class="bi bi-cloud-arrow-down-fill"
    style="font-size: 40px; margin-bottom: 20px"
  ></i>
  <div class="grid-container">
    <div>
      <h2>Windows</h2>
      <i class="bi bi-windows os-icon"></i>
      <a
        href="https://github.com/joel-foo/geniewallet/releases/latest/download/genie.wallet.Setup.0.1.0.exe"
        class="download-link btn"
        >Download</a
      >
      <h5>110MB</h5>
    </div>
    <div>
      <h2>MacOS</h2>
      <i class="bi bi-apple os-icon"></i>
      <a
        href="https://github.com/joel-foo/geniewallet/releases/latest/download/genie.wallet-0.1.0-arm64.dmg"
        class="download-link btn"
        >Download</a
      >
      <h5>79.1MB</h5>
    </div>
    <div>
      <h2>Linux</h2>
      <img src="@/assets/images/linux.png" alt="" style="width: 40px" />
      <a
        href="https://github.com/joel-foo/geniewallet/releases/latest/download/btcwallet_0.1.0_arm64.deb"
        class="download-link btn"
        >Download</a
      >
      <h5>51.5MB</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.download-link {
  text-decoration: none;
  background-color: #feda48;
  color: black;
}

.grid-container > div {
  height: 250px;
}

@media screen and (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-container > div {
    width: 280px;
    height: 350px;
  }
}
@media screen and (min-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-container > div {
    width: 300px;
    height: 400px;
  }
}
</style>
