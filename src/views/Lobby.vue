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
  }
}
</script>