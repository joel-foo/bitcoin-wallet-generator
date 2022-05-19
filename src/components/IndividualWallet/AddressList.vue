<template>
  <div class="address-list">
    <h1 v-if="!selectedAddressType">Addresses Generated</h1>
    <h1 v-else>BIP{{ selectedAddressType }} Addresses Generated</h1>
    <!-- initial overview page -->
    <div v-if="!selectedAddressType" class="initial-addresses-page">
      <div
        :class="['address-section', isExpand ? 'expand' : '']"
        v-for="(addressType, i) in addressTypes"
        :key="i"
        :id="`section-${i}`"
        @click="toggleExpand(i)"
      >
        <p id="address-title">{{ addressType }}</p>
        <div>
          <ul v-if="convert(addressType).length !== 0">
            <li v-for="(address, i) in convert(addressType)" :key="i">
              {{ address }}
            </li>
          </ul>
          <ul v-else>
            You currently have no addresses
          </ul>
        </div>
      </div>
    </div>

    <!-- individual address page  -->
    <div v-else class="addresses">
      <div>
        <ul v-if="convert(`bip${selectedAddressType}`).length !== 0">
          <li
            v-for="(address, i) in convert(`bip${selectedAddressType}`)"
            :key="i"
          >
            {{ address }}
          </li>
        </ul>
        <p style="text-align: center" v-else>No such addresses</p>
      </div>
    </div>
    <i
      class="bi bi-arrow-down-square-fill arrow-down-icon"
      @click="scrollDown"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWallets } from '@/stores/useWallets'
import { addressTypes } from '@/utils'

const store = useWallets()

const { id } = defineProps<{
  id: number
  selectedAddressType: string
}>()

function convert(addType: string): string[] {
  //need to check if array exists because populateOnMount is only called in onMounted(). thus return empty [] initially as fallback
  return store.addresses[addType][id]
    ? JSON.parse(store.addresses[addType][id])
    : []
}

function scrollDown() {
  document
    .querySelector('.address-info')!
    .scrollIntoView({ behavior: 'smooth' })
}

const isExpand = ref(false)
const selected = ref(null)

function toggleExpand(i: number) {
  const selectedEl = document.getElementById(`section-${i}`)!

  if (selectedEl.classList.contains('expand')) {
    selectedEl.classList.remove('expand')
    return
  }

  document.querySelectorAll('.address-section').forEach((el) => {
    el.classList.remove('expand')
    el.classList.remove('min')
  })

  selectedEl.classList.add('expand')

  document
    .querySelectorAll('.address-section')
    .forEach(
      (el) => !el.classList.contains('expand') && el.classList.add('min')
    )
}
</script>

<style scoped>
.initial-addresses-page,
.addresses {
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  max-height: 450px;
}

.addresses div {
  text-align: left;
  width: 90%;
  height: 100%;
  overflow: auto;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

ul li {
  padding: 5px;
}

.address-section {
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 14px;
  transition: 0.3s linear;
  text-align: left;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.address-section:hover {
  cursor: pointer;
}

.address-section.expand {
  width: 50%;
}

.address-section.min {
  width: 30%;
}

.address-section ul {
  margin-top: 50px;
  padding: 0;
}

.address-section > div {
  overflow: auto;
  height: 100%;
  padding-left: 20px;
}

#address-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  font-weight: 600;
}

@media only screen and (min-width: 992px) {
  .address-section {
    font-size: 16px;
  }
}
</style>
