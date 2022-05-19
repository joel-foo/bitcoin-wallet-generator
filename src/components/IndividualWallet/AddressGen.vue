<template>
  <div class="address-info">
    <i
      class="bi bi-arrow-left-square-fill backspace-icon"
      @click="$emit('select-address', '')"
      v-if="selectedAddressType"
    ></i>

    <p v-if="!selectedAddressType" style="width: 70vw; line-height: 40px">
      What kind of address do you want to generate?
    </p>

    <div class="btn-container" v-if="!selectedAddressType">
      <button
        class="address-btn"
        v-for="(addressType, i) in addressTypes"
        :key="i"
        @click="handleChoice(addressType)"
      >
        {{ addressType.toUpperCase() }}
      </button>
    </div>

    <div class="add-info" v-else>
      <p class="title">BIP{{ selectedAddressType }}</p>
      <div class="path-container">
        <p>Select your derivation path:</p>
        <form>
          m/{{ selectedAddressType }}'/<input
            type="text"
            placeholder="cointype"
            v-model="cointype"
          />/<input
            type="text"
            placeholder="account"
            v-model="account"
          />/<input type="text" placeholder="change" v-model="change" />/<input
            type="text"
            placeholder="address"
            v-model="addressInput"
          />
        </form>
        <p class="error-msg" v-show="error">Invalid path! Try again</p>
      </div>
      <button class="btn address" @click="clickGenAdd">Generate address</button>
      <p>{{ resultAddress }}</p>
      <canvas id="canvas"></canvas>
    </div>
    <button class="btn back-btn" @click="$router.push(`/wallets`)">
      Back to Wallets
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useWallets } from '@/stores/useWallets'
import { getAddress, addressTypes } from '@/utils'
import QRCode from 'qrcode'
import { BIP32Interface } from 'bip32'

let timeout: NodeJS.Timeout

//refs are automatically unwrapped when they are accessed as props, hence no need to append .value
const { id, root, selectedAddressType } = defineProps<{
  id: number
  root: BIP32Interface
  selectedAddressType: string
}>()

const emit = defineEmits<{ (e: 'select-address', value: string): void }>()

const store = useWallets()

// derivation path
const cointype = ref<string>("0'")
const account = ref<string>('')
const change = ref<string>('')
const addressInput = ref<string>('')
const resultAddress = ref<string>('')
const error = ref(false)

function handleChoice(addressType: string) {
  emit('select-address', addressType.slice(3))
  resultAddress.value = ''
}
function clickGenAdd() {
  genAddress()
  !error.value && genQR()
}
function genAddress() {
  const path = `m/${selectedAddressType}'/${cointype.value}/${account.value}/${change.value}/${addressInput.value}`
  try {
    const child = root.derivePath(path)
    console.log(child.privateKey!.toString('hex'))
    resultAddress.value = getAddress(child)

    const addType = `bip${selectedAddressType}`

    const initialState: string[] = JSON.parse(store.addresses[addType][id])

    if (initialState.indexOf(resultAddress.value) > -1) {
      alert('You have already generated this address!')
      return
    }

    store.$patch((state) => {
      initialState.push(resultAddress.value)

      state.addresses[addType][id] = JSON.stringify(initialState)
    })
  } catch (e) {
    if (timeout) {
      clearTimeout(timeout)
    }
    error.value = true
    timeout = setTimeout(() => (error.value = false), 500)
  }
}

//update local storage upon state mutation
store.$subscribe((mutation, state) => {
  //do not run on initial render
  if (selectedAddressType) {
    const addType = `bip${selectedAddressType}`
    localStorage.setItem(addType, JSON.stringify(state.addresses[addType]))
  }
})

function genQR() {
  const qrMessage = `bitcoin:${resultAddress}`
  QRCode.toCanvas(
    document.getElementById('canvas'),
    qrMessage,
    { width: 150 },
    function (error) {
      if (error) console.error(error)
    }
  )
}
</script>

<style scoped>
.address-info {
  font-size: 20px;
}

.add-info {
  max-width: 80vw;
  word-break: break-all;
}

.path-container form {
  line-height: 40px;
}

.path-container {
  position: relative;
}

input {
  font-size: inherit;
  font-family: inherit;
  width: 120px;
  border: 1px solid #ccc;
}

.btn {
  width: 100px;
  height: 60px;
}

.address-btn {
  margin-right: 10px;
  border-radius: 10px;
  padding: 10px;
  height: 100px;
  width: 100px;
  outline: 0;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 24px;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}

.error-msg {
  color: red;
  font-weight: bold;
  font-size: 16px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
}
.address-btn:hover {
  border: 1px solid #d58af5;
}

.btn.address {
  width: 160px;
  height: 40px;
  margin-top: 35px;
}

.backspace-icon {
  right: 10px;
  top: 10px;
}
</style>
