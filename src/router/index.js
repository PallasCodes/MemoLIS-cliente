import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

import Home from '../views/Home.vue'
import Players from '../views/Players.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import CreateGame from '../views/CreateGame.vue'
import Game from '../views/Game.vue'
import Lobby from '../views/Lobby.vue'
import ModalTest from '../views/ModalTest.vue'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: 'ModalTest',
    path: '/modaltest',
    component: ModalTest,
  },
  {
    name: 'Players',
    path: '/players',
    component: Players,
    meta: { requiresAuth: true },
  },
  {
    name: 'CreateGame',
    path: '/create-game',
    component: CreateGame,
    meta: { requiresAuth: true },
    props: { roomId: String }
  },
  {
    name: 'Lobby',
    path: '/lobby',
    component: Lobby,
    meta: { requiresAuth: true },
  },
  {
    name: 'Game',
    path: '/game',
    component: Game,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: { requiresUnauth: true },
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignUp,
    meta: { requiresUnauth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
