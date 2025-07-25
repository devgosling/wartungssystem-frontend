import { createRouter, createWebHistory } from 'vue-router'
import { account } from '@/lib/appwrite'
import HomeView from '../views/HomeView.vue'
import LoginScreen from '../views/LoginScreen.vue'
import { AppwriteException } from 'appwrite'
import { isUserLoggedIn } from '@/lib/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/wartungsberichte',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresUnauth: true,
        hideSidebar: true,
      },
      component: LoginScreen,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const isAuth = await isUserLoggedIn()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some((record) => record.meta.requiresUnauth)

  console.log(isAuth)
  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router
