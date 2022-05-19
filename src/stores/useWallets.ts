import { defineStore } from 'pinia'

type addressesType = {
  [key: string]: string[]
}

export const useWallets = defineStore('main', {
  state: () => {
    return {
      wallets: [] as string[],
      mnemonics: [] as string[],
      addresses: {
        bip32: [],
        bip44: [],
        bip49: [],
      } as addressesType,
    }
  },
})
