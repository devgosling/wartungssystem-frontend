import { createRouter, createWebHistory } from 'vue-router'
import { account } from '@/lib/appwrite'
import HomeView from '../views/HomeView.vue'
import LoginScreen from '../views/LoginScreen.vue'
import FourOFourPage from '../views/404.vue'
import WartungsberichteView from '@/views/Wartungsberichte.vue'
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
        title: 'Home',
      },
    },
    {
      path: '/wartungsberichte',
      name: 'wartungsberichte',
      component: WartungsberichteView,
      meta: {
        requiresAuth: true,
        title: 'Wartungsberichte',
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresUnauth: true,
        hideSidebar: true,
        title: 'Anmelden',
      },
      component: LoginScreen,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: FourOFourPage,
      meta: {
        title: '404',
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(guard)

async function guard(to, from, next) {
  const isAuth = await isUserLoggedIn()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some((record) => record.meta.requiresUnauth)

  document.title = 'KWT | ' + to.meta?.title ?? 'Panel'

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
}

export default router
