import { payments } from 'bitcoinjs-lib'
import { useWallets } from '@/stores/useWallets'

export const getAddress = (node: any, network?: any): string => {
  return payments.p2pkh({ pubkey: node.publicKey, network }).address!
}

function getItems(key: string): any[] {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : []
}

export const addressTypes = ['bip32', 'bip44', 'bip49']

export type InfoType = {
  [key: string]: {
    [key: string]: string
  }
}

const store = useWallets()

export const populateOnMount = () => {
  store.wallets = getItems('xprv')
  store.mnemonics = getItems('mnemonics')
  for (let type of addressTypes) {
    store.addresses[type] = getItems(type)
  }
}
