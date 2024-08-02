import './assets/tailwind.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from './i18n/index'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())

app.mount('#app')
