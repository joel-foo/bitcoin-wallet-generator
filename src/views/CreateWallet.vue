<template>
  <h1>Create your own HD Wallet!</h1>
  <div class="textarea-main-container">
    <Mnemonic
      :selectedLanguage="selectedLanguage"
      :languages="languages"
      :selectedLength="selectedLength"
      :mnemonic="mnemonic"
      @select-language="genMnemonic"
    />
    <convertedMnemonic
      :newSelectedLanguage="newSelectedLanguage"
      :languages="languages"
      :convertedMnemonic="convertedMnemonic"
      @convert-language="convertMnemonic"
    />
  </div>
  <WalletDetails
    :info="info"
    :mnemonic="mnemonic"
    :isMnemonicGenerated="isMnemonicGenerated"
    :isWalletSaved="isWalletSaved"
    @save-wallet="isWalletSaved = true"
    @reset-page="resetPage"
    :key="count"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BIP32Factory from 'bip32'
import * as bip39 from 'bip39'
import * as ecc from 'tiny-secp256k1'
import Mnemonic from '@/components/CreateWallet/Mnemonic.vue'
import ConvertedMnemonic from '@/components/CreateWallet/ConvertedMnemonic.vue'
import WalletDetails from '@/components/CreateWallet/WalletDetails.vue'
import { InfoType } from '@/utils'

const rng = require('randombytes')

let timeout: NodeJS.Timeout

function hex2bin(hex: string) {
  return hex
    .split('')
    .map((s) => parseInt(s, 16).toString(2).padStart(4, '0'))
    .join('')
}

function RNG(size: number): (size: number) => Buffer {
  return function (size) {
    return rng(size)
  }
}

const languages = [
  'chinese_simplified',
  'chinese_traditional',
  'czech',
  'english',
  'french',
  'italian',
  'japanese',
  'korean',
  'portuguese',
  'spanish',
]

const count = ref(0)
const mnemonic = ref<string>('')
const convertedMnemonic = ref<string>('')
const selectedLanguage = ref('english')
const newSelectedLanguage = ref('chinese_traditional')
const selectedLength = ref('24')
const isInvalidMnemonic = ref(false)
const isMnemonicGenerated = ref(false)
const entropy = ref<string>('')

const info = ref<InfoType>({
  xpub: {
    name: 'Extended Public Key',
    value: '',
  },
  xprv: {
    name: 'Extended Private Key',
    value: '',
  },
  chainCode: {
    name: 'Chain Code',
    value: '',
  },
  WIF: {
    name: 'WIF',
    value: '',
  },
})
const isWalletSaved = ref(false)

function genMnemonic([lang, length]: string[]) {
  selectedLanguage.value = lang
  selectedLength.value = length
  const bip32 = BIP32Factory(ecc)

  mnemonic.value = bip39.generateMnemonic(
    128 + (32 * (parseInt(selectedLength.value) - 12)) / 3,
    RNG(64),
    bip39.wordlists[selectedLanguage.value]
  )

  //need to force re-render
  count.value++

  // const entropyInHex = bip39.mnemonicToEntropy(
  //   mnemonic.value,
  //   bip39.wordlists[selectedLanguage.value]
  // )

  // entropy.value = hex2bin(entropyInHex)

  const seed = bip39.mnemonicToSeedSync(mnemonic.value)

  const node = bip32.fromSeed(seed)

  const { xpub, xprv, chainCode, WIF } = info.value
  xpub.value = node.neutered().toBase58()
  xprv.value = node.toBase58()
  chainCode.value = node.chainCode.toString('hex')
  WIF.value = node.toWIF()

  convertMnemonic(newSelectedLanguage.value)
  isMnemonicGenerated.value = true
}
function convertMnemonic(newLang: string) {
  newSelectedLanguage.value = newLang
  const isValid = bip39.validateMnemonic(
    mnemonic.value,
    bip39.wordlists[selectedLanguage.value]
  )
  if (!isValid) {
    if (timeout) clearTimeout(timeout)
    isInvalidMnemonic.value = true
    timeout = setTimeout(() => (isInvalidMnemonic.value = false), 1000)
    return
  }
  const entropy = bip39.mnemonicToEntropy(
    mnemonic.value,
    bip39.wordlists[selectedLanguage.value]
  )
  convertedMnemonic.value = bip39.entropyToMnemonic(
    entropy,
    bip39.wordlists[newSelectedLanguage.value]
  )
}

function resetPage() {
  mnemonic.value = ''
  convertedMnemonic.value = ''
  selectedLength.value = '24'
  selectedLanguage.value = 'english'
  newSelectedLanguage.value = 'chinese_traditional'
  entropy.value = ''
  const { xprv, xpub, chainCode, WIF } = info.value
  xprv.value = ''
  xpub.value = ''
  chainCode.value = ''
  WIF.value = ''
  isWalletSaved.value = false
  isMnemonicGenerated.value = false
}
</script>

<style>
h1 {
  margin: 30px 0 30px;
  font-size: 22px;
  font-weight: 600;
}

.center-fcol-card {
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.textarea-main-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mnemonic-textarea {
  outline: 0;
  border: 1px solid rgb(143, 141, 141);
  margin: 10px 0 0;
  font-family: inherit;
  font-size: 18px;
  padding: 10px;
  height: 150px;
  width: 335px;
  resize: none;
}

.mnemonic-select {
  width: 150px;
  font-family: inherit;
  margin: 10px 0 10px;
}

@media only screen and (min-width: 992px) {
  h1 {
    font-size: 30px;
  }
  .textarea-main-container {
    flex-direction: row;
  }
}
</style>
