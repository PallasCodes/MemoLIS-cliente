// vue ecosystem
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// internationalization
import en from './translations/en.json'
import es from './translations/es.json'

// 3rd party packages
import './assets/tailwind.css'
import axios from 'axios'
import VueSocketIO from 'vue-3-socket.io'
import { createI18n } from 'vue-i18n'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

console.log(process.env.VUE_APP_SERVER_URL)

// axios
axios.defaults.baseURL = SERVER_URL

// i18n
const i18n = createI18n({
  messages: { en, es },
  fallbackLocale: 'es'
})

// vue app
const app = createApp(App)
app.use(i18n)
app.use(
  new VueSocketIO({
    debug: true,
    connection: SERVER_URL,
    options: {},
  })
)
app.use(store)
app.use(router, axios)

app.mount('#app')
