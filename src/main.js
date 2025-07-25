import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Ripple from 'primevue/ripple'
import PrimeVue from 'primevue/config'
import { palette, updatePrimaryPalette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-darkmode',
    },
  },
})
app.use(ToastService);

updatePrimaryPalette(palette('#6bd0ff'))

app.mount('#app')
