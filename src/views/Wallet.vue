<template>
  <section>
    <div class="grid-single-wallet">
      <WalletInfo
        :xprv="xprv"
        :mnemonic="mnemonic"
        :xpub="xpub"
        :wif="wif"
        :id="id"
      />
      <AddressList
        :id="id"
        :selectedAddressType="selectedAddressType"
        :isEmpty="isEmpty"
      />
      <AddressGen
        :id="id"
        :root="root"
        :selectedAddressType="selectedAddressType"
        @select-address="(addType) => (selectedAddressType = addType)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWallets } from '../stores/useWallets'
import { populateStore } from '../utils'
import BIP32Factory, { BIP32Interface } from 'bip32'
import * as ecc from 'tiny-secp256k1'
import { useRoute } from 'vue-router'
import AddressGen from '../components/IndividualWallet/AddressGen.vue'
import AddressList from '../components/IndividualWallet/AddressList.vue'
import WalletInfo from '../components/IndividualWallet/WalletInfo.vue'

const bip32 = BIP32Factory(ecc)

const route = useRoute()

const store = useWallets()

//populate store with xprv, mnemonic, addresses...
populateStore()

//props
const id = ref<number>(parseInt(route.params.id as string) - 1)

const xprv = ref<string>(store.wallets[id.value])

const mnemonic = ref<string>(store.mnemonics[id.value])

const root = ref<BIP32Interface>(bip32.fromBase58(xprv.value))

const xpub = ref<string>(root.value.neutered().toBase58())

const wif = ref<string>(root.value.neutered().toBase58())

const selectedAddressType = ref<string>('')

//is selected address page empty?
const isEmpty = computed<string | boolean>(
  () =>
    selectedAddressType.value &&
    JSON.parse(store.addresses[`bip${selectedAddressType.value}`][id.value])
      .length === 0
)
</script>

<style lang="scss">
@import '@/assets/styles/general';

.grid-single-wallet {
  display: grid;
}

.main-card,
.address-info,
.address-list {
  @include flex-col-center;
  height: 100vh;
  width: 100vw;
  font-size: 16px;
  position: relative;
  padding: 30px;
}

.address-list {
  height: 50vh;
}

.address-info {
  /* 100% may be > 50vh */
  min-height: 50vh;
  height: 100%;
  grid-column: 1/-1;
}

.back-btn {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.arrow-down-icon,
.backspace-icon {
  position: absolute;
  font-size: 40px;
}

.arrow-down-icon {
  bottom: 10px;
}

@media only screen and (min-width: 992px) and (min-height: 590px) {
  .grid-single-wallet {
    grid-template-columns: 1fr 1fr;
  }

  .main-card,
  .address-info,
  .address-list {
    height: 50vh;
    width: 50vw;
  }

  .address-info {
    width: auto;
    min-height: 50vh;
    height: 100%;
  }

  .arrow-down-icon {
    display: none;
  }
}
</style>
