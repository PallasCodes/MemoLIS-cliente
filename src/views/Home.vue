<template>
  <nav
    class="
      max-w-lg
      px-4
      h-screen
      flex flex-col
      justify-center
      text-center
      mx-auto
      gap-4
      uppercase
    "
  >
    <button @click="createRoom" class="menu-btn uppercase">
      {{ t('pages.home.createGameBtn', {}, { locale: $store.getters.lang }) }}
    </button>
    <router-link to="/" class="menu-btn">
      {{ t('pages.home.rankingBtn', {}, { locale: $store.getters.lang }) }}
    </router-link>
    <router-link to="/players" class="menu-btn">
      {{ t('pages.home.playersBtn', {}, { locale: $store.getters.lang }) }}
    </router-link>
    <router-link to="/" class="menu-btn">
      {{ t('pages.home.profileBtn', {}, { locale: $store.getters.lang }) }}
    </router-link>
  </nav>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Home',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  methods: {
    createRoom() {
      this.$socket.emit('ROOM_createRoom')
    },
  },
  sockets: {
    ROOM_createdRoom(payload) {
      this.$store.commit('setOnlinePlayers', payload.players)
      this.$store.commit('setRoomId', payload.roomId)
      this.$router.replace({
        name: 'CreateGame',
        props: { roomId: payload.roomId },
      })
    },
  },
}
</script>
