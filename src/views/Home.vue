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
    "
  >
    <button @click="createRoom" class="menu-btn">CREAR PARTIDA</button>
    <router-link to="/" class="menu-btn">RANKING</router-link>
    <router-link to="/players" class="menu-btn">JUGADORES</router-link>
    <router-link to="/" class="menu-btn">PERFIL</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Home',
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
