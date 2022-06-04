<template>
  <section>
    <h1>Download genie wallet now.</h1>
    <i class="bi bi-cloud-arrow-down-fill cloud-icon"></i>
    <div class="grid-container">
      <div>
        <h2>Windows</h2>
        <i class="bi bi-windows os-icon"></i>
        <div>
          <a
            href="https://github.com/joel-foo/geniewallet/releases/latest/download/genie.wallet.Setup.0.1.0.exe"
            class="download-link btn"
            >Download</a
          >
        </div>
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
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/general';

section {
  padding: 30px;
}

.cloud-icon {
  font-size: 40px;
  margin: 20px 0 20px;
}

.download-link {
  text-decoration: none;
  background-color: #feda48;
  color: black;
  margin: 0;
}

.grid-container {
  display: grid;
}

.grid-container > div {
  height: 250px;
  @include flex-col-center;
  gap: 15px;
  padding: 10px;
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
