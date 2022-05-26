<template>
  <div class="address-info">
    <i
      class="bi bi-arrow-left-square-fill backspace-icon"
      @click="$emit('select-address', '')"
      v-if="selectedAddressType"
    ></i>

    <p v-if="!selectedAddressType" style="line-height: 40px">
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
      <p style="font-weight: bold; margin: 0">BIP{{ selectedAddressType }}</p>
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
        <p class="error-msg" v-show="error">
          <i class="bi bi-exclamation-circle-fill" style="margin-right: 5px"></i
          >Invalid path! Try again
        </p>

        <button class="btn address" @click="clickGenAdd">
          Generate address
        </button>
      </div>
      <p>{{ resultAddress }}</p>
      <canvas id="canvas"></canvas>
    </div>
    <button class="btn back-btn" @click="$router.push(`/playground/wallets`)">
      Back to Wallets
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useWallets } from '@/stores/useWallets'
import { getAddress, addressTypes } from '@/utils'
import QRCode from 'qrcode'
import { BIP32Interface } from 'bip32'

let timeout: NodeJS.Timeout

//refs are automatically unwrapped when they are accessed as props, hence no need to append .value
const props = defineProps<{
  id: number
  root: BIP32Interface
  selectedAddressType: string
}>()

const { id, root } = props
//without toRef, any destructured reactivity will decouple from the reactive proxy and lose reactivity
const selectedAddressType = toRef(props, 'selectedAddressType')

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
  const path = `m/${selectedAddressType.value}'/${cointype.value}/${account.value}/${change.value}/${addressInput.value}`
  try {
    const child = root.derivePath(path)
    console.log(child.privateKey!.toString('hex'))
    resultAddress.value = getAddress(child)

    const addType = `bip${selectedAddressType.value}`

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
  const addType = `bip${selectedAddressType.value}`
  localStorage.setItem(addType, JSON.stringify(state.addresses[addType]))
})

function genQR() {
  const qrMessage = `bitcoin:${resultAddress}`
  QRCode.toCanvas(
    document.getElementById('canvas'),
    qrMessage,
    { width: 140 },
    function (error) {
      if (error) console.error(error)
    }
  )
}
</script>

<style scoped>
p {
  margin: 10px 0 10px;
}

.address-info {
  font-size: 20px;
}

.add-info {
  width: 80vw;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.path-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.path-container form {
  line-height: 40px;
}

.error-msg {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

input {
  font-size: 18px;
  font-family: inherit;
  width: 80px;
  border: 1px solid #ccc;
  height: 30px;
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
}

.address-btn:hover {
  border: 1px solid #feda48;
}

.btn.address {
  width: 160px;
  height: 40px;
  margin-top: 10px;
}

.backspace-icon {
  right: 10px;
  top: 10px;
}
</style>
