<template>
  <section>
    <h1 style="margin-bottom: 30px; font-size: 24px">
      Create your own HD Wallet!
    </h1>
    <div class="grid-create">
      <Mnemonic
        :languages="languages"
        :mnemonic="mnemonic"
        :isInvalidMnemonic="isInvalidMnemonic"
        @select-language="genMnemonic"
      />
      <convertedMnemonic
        :languages="languages"
        :convertedMnemonic="convertedMnemonic"
        :newSelectedLanguage="newSelectedLanguage"
        @convert-language="onConvert"
      />
      <WalletDetails
        :info="info"
        :mnemonic="mnemonic"
        :isMnemonicGenerated="isMnemonicGenerated"
        :isWalletSaved="isWalletSaved"
        @save-wallet="isWalletSaved = true"
        @reset-page="resetPage"
      />
    </div>
  </section>
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

const selectedLanguage = ref<string>('')
const selectedLength = ref<null | number>(null)
const mnemonic = ref<string>('')

const isInvalidMnemonic = ref(false)

const newSelectedLanguage = ref('chinese_traditional')
const convertedMnemonic = ref<string>('')

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

async function genMnemonic([lang, len]: (string | number)[]) {
  selectedLanguage.value = lang as string
  selectedLength.value = len as number

  const bip32 = BIP32Factory(ecc)

  mnemonic.value = bip39.generateMnemonic(
    128 + (32 * (selectedLength.value - 12)) / 3,
    RNG(64),
    bip39.wordlists[selectedLanguage.value]
  )

  // const entropyInHex = bip39.mnemonicToEntropy(
  //   mnemonic.value,
  //   bip39.wordlists[selectedLanguage.value]
  // )

  // entropy.value = hex2bin(entropyInHex)

  const seed = await bip39.mnemonicToSeed(mnemonic.value)

  const node = bip32.fromSeed(seed)

  const { xpub, xprv, chainCode, WIF } = info.value
  xpub.value = node.neutered().toBase58()
  xprv.value = node.toBase58()
  chainCode.value = node.chainCode.toString('hex')
  WIF.value = node.toWIF()

  //also convert when generate seed
  convertMnemonic(newSelectedLanguage.value)

  isMnemonicGenerated.value = true
}

function onConvert(n: string) {
  newSelectedLanguage.value = n
  convertMnemonic(n)
}

function convertMnemonic(newLang: string) {
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
    bip39.wordlists[newLang]
  )
}

function resetPage() {
  mnemonic.value = ''
  convertedMnemonic.value = ''
  selectedLength.value = 24
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

<style lang="scss">
@import '@/assets/styles/general';

section {
  padding: 30px;
}

.grid-create {
  display: grid;
  gap: 10px;
}

.center-fcol-card {
  @include flex-col-center;
  width: 370px;
  height: 350px;
  border-radius: 3px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.mnemonic-textarea {
  margin: 10px 0 0;
  font-family: inherit;
  font-size: 18px;
  padding: 10px;
  height: 150px;
  width: 90%;
}

.mnemonic-select {
  width: 145px;
  font-family: inherit;
  margin: 10px 0 10px;
}

@media only screen and (min-width: 800px) {
  h1 {
    font-size: 30px;
  }
  .grid-create {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
