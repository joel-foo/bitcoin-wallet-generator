<script setup lang="ts">
import { ref } from 'vue'
import BIP32Factory from 'bip32'
import * as bip39 from 'bip39'
import * as ecc from 'tiny-secp256k1'
import * as bitcoin from 'bitcoinjs-lib'
import { debounce } from 'lodash'
import { useWallets } from '../stores/useWallets'
import { addressTypes } from '../utils'

const rng = require('randombytes')

let timeout: NodeJS.Timeout

function hex2bin(hex: string) {
  return hex
    .split('')
    .map((s) => parseInt(s, 16).toString(2).padStart(4, '0'))
    .join('')
}

function RNG(size: number) {
  return function (size: number): Buffer {
    const random: Buffer = rng(size)
    return random
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
const lengths = [12, 15, 18, 21, 24]

const mnemonic = ref<string>('')
const convertedMnemonic = ref<string>('')
const selectedLanguage = ref('english')
const newSelectedLanguage = ref('chinese_traditional')
const selectedLength = ref('24')
const isInvalidMnemonic = ref(false)
const isMnemonicGenerated = ref(false)
const entropy = ref<string>('')
const info = ref({
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

function genMnemonic() {
  const bip32 = BIP32Factory(ecc)

  mnemonic.value = bip39.generateMnemonic(
    128 + (32 * (parseInt(selectedLength.value) - 12)) / 3,
    RNG(64),
    bip39.wordlists[selectedLanguage.value]
  )

  const entropyInHex = bip39.mnemonicToEntropy(
    mnemonic.value,
    bip39.wordlists[selectedLanguage.value]
  )

  entropy.value = hex2bin(entropyInHex)

  const seed = bip39.mnemonicToSeedSync(mnemonic.value)

  const node = bip32.fromSeed(seed)

  const { xpub, xprv, chainCode, WIF } = info.value
  xpub.value = node.neutered().toBase58()
  xprv.value = node.toBase58()
  chainCode.value = node.chainCode.toString('hex')
  WIF.value = node.toWIF()

  convertMnemonic()
  isMnemonicGenerated.value = true
}
function convertMnemonic() {
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

const store = useWallets()

function saveWallet() {
  isWalletSaved.value = true
  const { xprv } = info.value
  store.$patch((state) => {
    state.wallets.push(xprv.value)
    state.mnemonics.push(mnemonic.value)
    for (let type of addressTypes) {
      state.addresses[type].push('[]')
    }
  })
}

store.$subscribe(
  (mutation, state) => {
    localStorage.setItem('xprv', JSON.stringify(state.wallets))
    localStorage.setItem('mnemonics', JSON.stringify(state.mnemonics))
    for (let type of addressTypes) {
      localStorage.setItem(type, JSON.stringify(state.addresses[type]))
    }
  },
  { detached: true }
)

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

<template>
  <h1>Create your own HD Wallet!</h1>
  <div class="textarea-main-container">
    <div class="textarea-container">
      <div class="select-containers">
        <div class="select-container">
          <label for="language">Select a language:</label>
          <select name="language" id="language" v-model="selectedLanguage">
            <option
              v-for="(language, index) in languages"
              :key="index"
              :value="language"
            >
              {{ language }}
            </option>
          </select>
        </div>
        <div class="select-container">
          <label for="length">Select a length:</label>
          <select name="length" id="length" v-model="selectedLength">
            <option
              v-for="(length, index) in lengths"
              :key="index"
              :value="length"
            >
              {{ length }}
            </option>
          </select>
        </div>
      </div>
      <textarea
        name="mnemonic"
        id="mnemonic"
        cols="40"
        rows="3"
        v-model="mnemonic"
        :class="{ invalid: isInvalidMnemonic }"
        spellcheck="false"
      ></textarea>
      <button @click="genMnemonic" class="btn">Generate seed</button>
    </div>
    <div class="textarea-container">
      <label for="mnemonic">Convert to another language:</label>
      <select name="language" id="language" v-model="newSelectedLanguage">
        <option
          v-for="(language, index) in languages"
          :key="index"
          :value="language"
        >
          {{ language }}
        </option>
      </select>
      <textarea
        name="convertedMnemonic"
        id="convertedMnemonic"
        cols="40"
        rows="3"
        v-model="convertedMnemonic"
        spellcheck="false"
      ></textarea>
      <button @click="convertMnemonic" class="btn">Convert seed</button>
    </div>
  </div>
  <div class="wallet-info">
    <div v-for="(key, index) in info" :key="index">
      {{ key.name }}:
      <textarea v-model="key.value" spellcheck="false"></textarea>
      <i class="bi bi-info-circle-fill info-icon"></i>
    </div>
    <div class="btn-container">
      <p v-if="!isMnemonicGenerated">
        You currently do not have a wallet generated
      </p>
      <button
        class="btn"
        @click="saveWallet"
        v-if="!isWalletSaved && isMnemonicGenerated"
      >
        Save Wallet
      </button>
      <button
        class="btn choice-btn"
        v-if="isWalletSaved"
        @click="$router.push(`/wallet/${store.wallets.length}`)"
      >
        View new wallet!
      </button>
      <button class="btn choice-btn" v-if="isWalletSaved" @click="resetPage">
        Generate another wallet?
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 30px 0 30px;
  font-size: 22px;
  font-weight: 600;
}

.textarea-main-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.textarea-container,
.wallet-info,
.entropy-info {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

textarea {
  outline: 0;
  border: 1px solid rgb(143, 141, 141);
  margin: 10px 0 0;
  font-family: inherit;
  font-size: 18px;
  padding: 10px;
  height: 150px;
  width: 350px;
  resize: none;
}

textarea.invalid {
  border: 1px solid transparent;
  outline: 1px solid red;
}

.select-containers {
  display: flex;
}

select {
  width: 150px;
  font-family: inherit;
  margin: 10px 0 10px;
}

.btn-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}

.btn-container .btn {
  margin: 0;
}

.choice-btn {
  margin: 0;
  height: 50px;
  width: 100%;
}

.entropy-info {
  margin-top: 30px;
  padding: 20px;
  position: relative;
  display: inline;
  word-break: break-all;
  font-size: 24px;
}

.entropy-info::before {
  content: '';
  position: absolute;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.1;
}

.entropy-info span {
  font-weight: bold;
}

.entropy-info span:nth-of-type(even) {
  color: #008f11;
}

.wallet-info {
  height: 700px;
  margin: 30px 0 30px;
  gap: 15px;
}

.wallet-info > div {
  width: 300px;
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.info-icon {
  position: absolute;
  left: 40px;
}

.info-icon:hover {
  /* add text bubble */
}

.wallet-info textarea {
  width: 100%;
  height: 90px;
}

@media only screen and (min-width: 992px) {
  h1 {
    font-size: 30px;
  }
  .textarea-main-container {
    flex-direction: row;
  }
  .btn-container {
    max-height: 70px;
  }
  .wallet-info {
    width: 820px;
  }
  .wallet-info > div {
    width: 700px;
    flex-direction: row;
  }
  .wallet-info textarea {
    width: 500px;
    margin-left: auto;
  }
  .info-icon {
    right: unset;
    bottom: 20px;
    left: 10px;
  }
}
</style>
