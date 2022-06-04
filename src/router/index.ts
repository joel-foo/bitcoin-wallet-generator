import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouterView } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('../views/Download.vue'),
  },
  {
    path: '/playground',
    name: 'playground',
    component: RouterView,
    children: [
      {
        path: '',
        component: () => import('../views/Playground.vue'),
      },
      {
        path: 'create-wallet',
        name: 'create-wallet',
        component: () => import('../views/CreateWallet.vue'),
      },
      {
        path: 'wallets',
        name: 'wallets',
        component: () => import('../views/ViewWallets.vue'),
      },
      {
        path: 'wallet/:id',
        name: 'wallet',
        component: () => import('../views/Wallet.vue'),
      },
    ],
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

//createWebHistory(process.env.BASE_URL)
