import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/create-wallet',
    name: 'create-wallet',
    component: () => import('../views/CreateWallet.vue'),
  },
  {
    path: '/wallet/:id',
    name: 'wallet',
    component: () => import('../views/Wallet.vue'),
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import('../views/ViewWallets.vue'),
  },
  {
    path: '/utxo-checker',
    name: 'utxo-checker',
    component: () => import('../views/UTXOChecker.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
