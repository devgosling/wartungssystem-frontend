<template>
  <Toast />
  <main>
    <Sidebar v-if="!hideSidebar" />
    <div id="router-view-main">
      <RouterView />
    </div>
  </main>
</template>
<script>
import { RouterView, useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import Sidebar from './components/Sidebar.vue'
import router from './router'

export default {
  components: {
    Toast,
    Sidebar,
  },

  data() {
    return {
      hideSidebar: true,
      router: router,
    }
  },

  created() {
    setInterval(() => {
      this.hideSidebar = router.currentRoute.value.matched.some((el) => el.meta.hideSidebar)
    }, 0)
  },
}
</script>
<style lang="scss">
#router-view-main {
  padding: 1.5rem;
}

h1 {
  margin: 0rem 0;
}

main {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 17rem auto;
  background-color: var(--p-surface-50);
}
</style>
