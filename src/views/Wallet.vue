<template>
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
      :key="count"
      :selectedAddressType="selectedAddressType"
      @select-address="updateAddress"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, ComputedRef } from 'vue'
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

//is selected address page empty?
const isEmpty = computed<string | boolean>(
  () =>
    selectedAddressType.value &&
    convert(`bip${selectedAddressType.value}`).length === 0
)

//parser function
function convert(addType: string): string[] {
  return store.addresses[addType][id.value]
    ? JSON.parse(store.addresses[addType][id.value])
    : []
}

//executes on receiving select-address emit
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
.grid-single-wallet {
  display: grid;
}

h1 {
  /* color: #486cfe; */
}

.main-card,
.address-info,
.address-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 16px;
  position: relative;
  /* border: 1px solid black; */
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
