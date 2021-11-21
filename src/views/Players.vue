<template>
  <section id="players">
    <!-- ARROW icon -->
    <router-link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 mb-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg>
    </router-link>
    <!-- end ARROW icon -->
    <h2 class="text-2xl text-gray-700 mb-4">
        {{ t('pages.players.title', {}, { locale: $store.getters.lang }) }}
    </h2>
    <form
      @submit.prevent="searchPlayer"
      class="flex bg-white max-w-xs items-center px-2 py-1 rounded-xl mb-4 border-2 border-gray-400"
    >
      <input
        v-model="search"
        type="text"
        :placeholder="t('pages.players.searchPlayer', {}, { locale: $store.getters.lang })"
        class="w-full outline-none text-gray-600"
        autofocus
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>

    <p v-for="player in getPlayers" :key="player.id" class="mt-4">
      <span class="mr-2">{{ player.username }} - {{ player.score }}</span>
      <button
        @click="addPlayer(player.id)"
        class="
          text-xs
          font-medium
          bg-blue-500
          py-1
          px-2
          rounded
          hover:bg-blue-600
          transition-colors
          ease
          duration-300
          text-white
        "
      >
        + {{t('pages.players.addPlayer', {}, { locale: $store.getters.lang })}}
      </button>
    </p>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: 'Players',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      players: [],
      search: '',
    }
  },
  computed: {
    getPlayers() {
      return this.players.filter(
        (player) => player.id != this.$store.getters.userId
      )
    },
  },
  async mounted() {
    try {
      const response = await axios.get('/user')
      this.players = response.data.users
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async searchPlayer() {
      try {
        const response = await axios.get('/user/' + this.search)
        this.players = response.data.users
      } catch (error) {
        console.error(error)
        createToast(
          {
            title: 'Error',
            description:
              'Ocurrió un error en el servidor. Inténtalo más tarde.',
          },
          {
            type: 'danger',
            hideProgressBar: true,
            transition: 'slide',
            position: 'bottom-right',
            showIcon: true,
          }
        )
      }
    },
    addPlayer(id) {
      const payload = {
        sentTo: id,
        userId: this.$store.getters.userId,
      }
      this.$socket.emit('USER_friendRequest', payload)
    },
  },
}
</script>
 