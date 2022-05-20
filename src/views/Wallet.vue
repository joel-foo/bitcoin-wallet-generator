<template>
  <div class="row">
    <WalletInfo
      :xprv="xprv"
      :mnemonic="mnemonic"
      :xpub="xpub"
      :wif="wif"
      :id="id"
    />
    <AddressList :id="id" :selectedAddressType="selectedAddressType" />
  </div>
  <AddressGen
    :id="id"
    :root="root"
    :key="count"
    :selectedAddressType="selectedAddressType"
    @select-address="updateAddress"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useWallets } from '../stores/useWallets'
import { populateOnMount } from '../utils'
import BIP32Factory, { BIP32Interface } from 'bip32'
import * as ecc from 'tiny-secp256k1'
import { useRoute } from 'vue-router'
import AddressGen from '../components/IndividualWallet/AddressGen.vue'
import AddressList from '../components/IndividualWallet/AddressList.vue'
import WalletInfo from '../components/IndividualWallet/WalletInfo.vue'

const bip32 = BIP32Factory(ecc)

const route = useRoute()

const store = useWallets()

//props
const id = computed<number>(() => parseInt(route.params.id as string) - 1)
const root = ref<BIP32Interface | null>(null)
const selectedAddressType = ref<string>('')

// wallet info
const xpub = ref<string>('')
const xprv = ref<string>('')
const mnemonic = ref<string>('')
const wif = ref<string>('')

//to force re-render to ensure props ('root', 'selectedAddressType' are the most updated)
const count = ref(0)

function updateAddress(addType: string) {
  selectedAddressType.value = addType
  count.value++
}

//populate store on mount
onMounted(() => {
  populateOnMount()
  xprv.value = store.wallets[id.value]
  mnemonic.value = store.mnemonics[id.value]
  root.value = bip32.fromBase58(xprv.value)
  //force rerender of AddressGen to ensure 'root' prop is updated
  count.value++
  xpub.value = root.value.neutered().toBase58()
  wif.value = root.value.toWIF()
})
</script>

<style>
.row {
  display: flex;
  flex-direction: column;
}

.main-card,
.address-info,
.address-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
  width: 100vw;
  font-size: 16px;
  position: relative;
  box-shadow: 0 0 3px rgba(22, 119, 216, 0.4);
}

.back-btn {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

p.title {
  font-weight: 600;
}

.arrow-down-icon,
.backspace-icon {
  position: absolute;
  font-size: 40px;
}

.arrow-down-icon {
  bottom: 10px;
}

textarea:focus,
input:focus {
  border: 1px solid transparent;
  outline: 1px solid steelblue;
}

.address-btn:hover,
.backspace-icon:hover {
  cursor: pointer;
}

@media only screen and (min-width: 992px) and (min-height: 590px) {
  .row {
    flex-direction: row;
  }
  .main-card,
  .address-info,
  .address-list {
    height: 50vh;
    width: 50vw;
    background-color: unset;
    background-image: unset;
  }
  .address-info {
    width: 100vw;
  }
  .arrow-down-icon {
    display: none;
  }
  .address-info {
    height: 100%;
    min-height: 50vh;
  }
}
</style>
