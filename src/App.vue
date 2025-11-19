<template>
  <Toast />
  <ConfirmPopup style="max-width: 35rem"></ConfirmPopup>
  <Dialog
    header="Lege dein erstes Passwort fest"
    :visible="showSetPasswortDialog"
    modal
    :closable="false"
  >
    <div class="setpassword">
      <span>Lege dein erstes Passwort fest.<br />Es muss mindestens 8 Zeichen lang sein.</span>
      <div class="setpassword-inputgroup">
        <label for="">Passwort</label>
        <Password toggleMask fluid v-model="password"></Password>
      </div>
      <div class="setpassword-inputgroup">
        <label for="">Passwort wiederholen</label>
        <Password toggleMask fluid v-model="repeatedPassword"></Password>
      </div>
      <Message severity="error" size="small" v-if="password !== repeatedPassword"
        >Dein wiederholtes Password stimmt nicht überein.</Message
      >
      <Button
        label="Password ändern"
        severity="secondary"
        :disabled="
          password !== repeatedPassword || !password || !repeatedPassword || password.length < 8
        "
        @click="setFirstPassword"
      ></Button>
    </div>
  </Dialog>
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
import { Button, ConfirmPopup, Dialog, Message, Password } from 'primevue'
import { isUserLoggedIn } from './lib/utils'
import { account } from './lib/appwrite'
import { AppwriteException } from 'appwrite'

export default {
  components: {
    Toast,
    ConfirmPopup,
    Sidebar,
    Dialog,
    Password,
    Message,
    Button,
  },

  data() {
    return {
      hideSidebar: true,
      router: router,

      showSetPasswortDialog: false,
      password: null,
      repeatedPassword: null,
    }
  },

  created() {
    setInterval(() => {
      this.hideSidebar = router.currentRoute.value.matched.some((el) => el.meta.hideSidebar)
    }, 0)
  },

  async mounted() {
    let isLoggedIn = false
    do {
      isLoggedIn = await isUserLoggedIn()
    } while (!isLoggedIn)

    let userAccount = await account.get()

    if (!userAccount.prefs.hasOwnProperty('initialized')) {
      this.showSetPasswortDialog = true
    }
  },

  methods: {
    async setFirstPassword() {
      try {
        let userAccount = await account.get()
        await account.updatePassword(
          this.password,
          `12345${userAccount.name.split(' ')[1].toLowerCase()}`,
        )

        await account.updatePrefs({ initialized: 'true' })
        this.showSetPasswortDialog = false
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Fehler',
          detail:
            'Es ist ein unbekannter Fehler aufgetreten, bitte wende dich an einen Systemadministrator',
          life: 5000,
        })
      }
    },
  },
}
</script>
<style lang="scss">
#router-view-main {
  padding: 1.5rem;
  overflow-y: scroll;
}

h1 {
  margin: 0rem 0;
}

main {
  height: 100dvh;
  width: 100vw;
  display: grid;
  grid-template-columns: 17rem auto;
  background-color: var(--p-surface-50);
  overflow: hidden;
}

.setpassword {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-inputgroup {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    label {
      font-weight: 600;
      font-size: 1.05rem;
    }
  }
}
</style>
