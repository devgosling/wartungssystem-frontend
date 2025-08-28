import { createRouter, createWebHistory } from 'vue-router'
import { account, teams } from '@/lib/appwrite'
import HomeView from '../views/HomeView.vue'
import LoginScreen from '../views/LoginScreen.vue'
import FourOFourPage from '../views/404.vue'
import FourOOnePage from '../views/401.vue'
import WartungsberichteView from '@/views/Wartungsberichte.vue'
import MitarbeiterView from '@/views/Mitarbeiter.vue'
import CustomersView from '@/views/Kunden.vue'
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
      path: '/employees',
      name: 'employees',
      component: MitarbeiterView,
      meta: {
        requiresAuth: true,
        requiresTeam: 'administration',
        title: 'Mitarbeiter',
      },
    },
    {
      path: '/customers',
      name: 'customer',
      component: CustomersView,
      meta: {
        requiresAuth: true,
        title: 'Kunden',
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
    {
      path: '/401',
      name: '401',
      component: FourOOnePage,
      meta: {
        title: '401',
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
  const requiresTeam = to.matched.some((record) => record.meta.requiresTeam)

  document.title = 'KWT | ' + to.meta?.title ?? 'Panel'

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else if (requiresTeam) {
    var hasAccess = false
    var user = await account.get()
    switch (to.meta.requiresTeam) {
      case 'administration':
        const adminTeamMemberships = await teams.listMemberships('68866cde003207e2fbab')
        var members = []
        adminTeamMemberships.memberships.forEach((membership) => {
          members.push(membership.userId)
        })
        if (members.indexOf(user.$id) !== -1) hasAccess = true
        console.log(adminTeamMemberships)
        break

      default:
        break
    }
    if (!hasAccess) next('/401')
    else next()
  } else next()
}

export default router
