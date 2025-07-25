<template>
  <div class="sidebar">
    <div class="sidebar-uppr">
      <img src="../assets/Wassertechnik_Schrift.png" alt="" draggable="false" />

      <!-- TODO: Wartungsberichte Tabs einfügen -->
      <!-- TODO: Kundendatenbank einfügen -->
      <!-- TODO: Benutzerverwaltung einfügem -->

      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="sidebar-tab"
        :data-active="vrouter.currentRoute.path == tab.path ? true : false"
        @click="vrouter.push(tab.path)"
      >
        <i :class="tab.icon"></i> {{ tab.title }}
      </button>
      <!--<Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Lüfter</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Motor</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Wehrtore</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Schmutzwasser [...]</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Müllanlage</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Pumpe</Button>
      <Button variant="outlined" severity="secondary" class="sidebar-ctgry-tab">Wärmetaucher</Button>-->
    </div>

    <div class="sidebar-lwr">
      <button class="sidebar-tab danger" @click="logout">
        <i class="fa-regular fa-right-from-bracket"></i> Abmelden
      </button>
    </div>
  </div>
</template>
<script>
import { account } from '@/lib/appwrite'
import router from '@/router'
import { Button } from 'primevue'

export default {
  components: {
    Button,
  },

  data() {
    return {
      vrouter: router,
      tabs: [
        { title: 'Dashboard', icon: 'fa-regular fa-objects-column', path: '/' },
        { title: 'Wartungsberichte', icon: 'fa-regular fa-file-pdf', path: '/wartungsberichte' },
      ],
    }
  },

  methods: {
    async logout() {
      await account.deleteSession('current')
      router.push('/login')
    },
  },
}
</script>
<style lang="scss">
.sidebar {
  animation-name: sidebarPopup;
  animation-duration: 500ms;
  animation-delay: 100ms;
  animation-fill-mode: forwards;
  transform: translateX(-100%);

  height: 100dvh;
  width: 100%;

  padding: 2rem 1rem;

  background-color: rgb(221, 240, 255);

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  &-tab {
    transition: all 0.3s;

    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    background-color: transparent;
    color: rgb(97, 97, 97);
    border: none;
    text-align: left;
    padding: 0.8rem 0.8rem;
    border-radius: 0.6rem;

    display: flex;
    gap: 0.6rem;
    align-items: center;

    cursor: pointer;
  }

  &-tab.danger {
    background-color: #ef4444;
    color: white;
  }

  &-tab.danger:hover {
    background-color: #c73838;
  }

  &-tab[data-active='false']:hover {
    background-color: rgba(14, 102, 255, 0.079);
  }

  &-tab[data-active='true'] {
    color: white;
    background-color: rgba(14, 102, 255, 0.716);
  }

  img {
    width: 100%;
    margin-bottom: 1rem;
  }

  .p-button {
    width: 100%;
  }

  &-uppr {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &-ctgry-title {
    color: rgb(121, 155, 187);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02rem;
  }
}

@keyframes sidebarPopup {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
