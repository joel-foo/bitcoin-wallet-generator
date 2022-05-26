<template>
  <div class="address-list">
    <h1 v-if="!selectedAddressType">Addresses Generated</h1>
    <h1 v-else>BIP{{ selectedAddressType }} Addresses</h1>
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

    <!-- individual address page  -->
    <div v-else class="addresses">
      <div :class="['addresses-inner', isEmpty ? 'center' : '']">
        <ul v-if="!isEmpty">
          <li
            v-for="(address, i) in convert(`bip${selectedAddressType}`)"
            :key="i"
          >
            {{ address }}
          </li>
        </ul>
        <p v-else>No such addresses</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWallets } from '@/stores/useWallets'
import { addressTypes } from '@/utils'

const store = useWallets()

const { id } = defineProps<{
  id: number
  selectedAddressType: string
  isEmpty: string | boolean
}>()

//note: if isEmpty is string it can only be '', which will evaluate to falsy

const isExpand = ref(false)
const selected = ref(null)

function convert(addType: string): string[] {
  //need to check if array exists because populateOnMount is only called in onMounted(). thus return empty [] initially as fallback
  return store.addresses[addType][id]
    ? JSON.parse(store.addresses[addType][id])
    : []
}

//toggle expansion
function toggleExpand(i: number) {
  const selectedEl = document.getElementById(`section-${i}`)!

  const isOpen = selectedEl.classList.contains('expand')

  document.querySelectorAll('.address-section').forEach((el) => {
    el.classList.remove('expand')
    el.classList.remove('min')
  })

  if (isOpen) {
    return
  }

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
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

/* individual address page */
.addresses-inner {
  text-align: left;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.addresses-inner.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* individual address section in overview */
.address-section {
  height: 100%;
  width: 33%;
  position: relative;
  font-size: 14px;
  transition: 0.3s linear;
  text-align: left;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  overflow: auto;
}

.address-section:hover {
  cursor: pointer;
}

.address-section.expand {
  width: 65%;
}

.address-section.min {
  width: 17%;
}

#address-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  font-weight: 600;
}

.address-section ul {
  margin-top: 50px;
  padding-left: 20px;
}

ul li {
  padding: 5px;
}

@media only screen and (min-width: 992px) {
  .address-section {
    font-size: 16px;
  }
}
</style>
