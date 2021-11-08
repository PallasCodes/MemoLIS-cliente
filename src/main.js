// vue ecosystem
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 3rd party packages
import './assets/tailwind.css'
import axios from 'axios'
// import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-3-socket.io'

axios.defaults.baseURL = 'http://localhost:3000'

// vue app
const app = createApp(App)
app.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    options: {},
  })
)
app.use(store)
app.use(router, axios)

app.mount('#app')
