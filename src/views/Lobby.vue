<template>
  <section id="lobby">
    <h1 class="text-semibold text-2xl">Lobby</h1>
  </section>
</template>

<script>
export default {
  name: 'Lobby',
  mounted() {
    this.$socket.emit('ROOM_join', this.$store.getters.roomId)
  },
  sockets: {
    GAME_gameStarted(game) {
      console.log(game)
      this.$store.commit('setGame', game)
      this.$router.replace({ name: 'Game'})
    }
  }
}
</script>