<template>
  <section class="create-game">
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
    <h2 class="text-2xl">Crear Juego</h2>
    <button
      @click="startGame"
      class="p-2 text-lg rounded font-semibold text-white bg-blue-500 my-6"
    >
      Iniciar juego
    </button>
    <h3 class="text-lg mt-2">Amigos conectados</h3>
    <ul class="mt-2">
      <li v-for="friend in getFriends" :key="friend.id">
        {{ friend.username }}
        <button
          @click="sendInvite(friend.socketId)"
          class="
            ml-2
            bg-blue-500
            p-1
            px-2
            text-white
            rounded
            text-xs
            font-medium
          "
        >
          Invitar
        </button>
      </li>
    </ul>
    <h3 class="text-lg mt-4">Lobby</h3>
    <ul class="mt-2">
      <li v-for="player in getLobby" :key="player.userId">
        {{ player.username }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'CreateGame',
  props: ['roomId'],
  data() {
    return {
      friends: [],
      lobby: [],
    }
  },
  computed: {
    getFriends() {
      return this.friends.filter(
        (user) => user.username != this.$store.getters.username
      )
    },
    getLobby() {
      return this.lobby
    },
  },
  sockets: {
    ROOM_onlinePlayers(users) {
      this.friends = users
    },
    USER_userConnected(user) {
      this.friends.push(user)
      console.log(user)
    },
    USER_userDisconnected(user) {
      console.log(user)
      this.friends = this.friends.filter((friend) => friend.id != user.id)
    },
    ROOM_userJoined(user) {
      this.lobby.push(user)
    },
  },
  methods: {
    sendInvite(socketId) {
      this.$socket.emit('USER_gameRequest', socketId)
    },
    startGame() {
      this.$socket.emit('ROOM_startGame')
    }
  },
  mounted() {
    this.$socket.emit('ROOM_join', this.$store.getters.roomId)
  },
}
</script>
