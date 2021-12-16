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
    <h2 class="text-2xl" :disabled="lobby.length > 0">
      {{ t('pages.createGame.title', {}, { locale: $store.getters.lang }) }}
    </h2>
    <button
      @click="startGame"
      class="
        py-2
        px-3
        text-sm
        rounded
        font-semibold
        text-white
        bg-blue-500
        mt-6
        mb-4
        block
      "
    >
      {{ t('pages.createGame.startBtn', {}, { locale: $store.getters.lang }) }}
    </button>
    <label class="block mt-2">
      {{ t('pages.createGame.numPairs', {}, { locale: $store.getters.lang }) }}
    </label>
    <div class="w-32">
      <select v-model="numPairs" class="input" >
        <option value="9" selected>9</option>
        <option value="12">12</option>
        <option value="15">15</option>
        <option value="15">18</option>
      </select>
    </div>
    <h3 class="text-lg mt-8">
      {{
        t('pages.createGame.onlinePlayers', {}, { locale: $store.getters.lang })
      }}
    </h3>
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
import { useI18n } from 'vue-i18n'

export default {
  name: 'CreateGame',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  props: ['roomId'],
  data() {
    return {
      friends: [],
      lobby: [],
      numPairs: 9,
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
    },
    USER_userDisconnected(user) {
      this.friends = this.friends.filter(
        (friend) => friend.userId != user.userId
      )
    },
    ROOM_userJoined(user) {
      this.lobby.push(user)
    },
    GAME_gameStarted(game) {
      this.$store.commit('setGame', game)
      this.$router.replace({ name: 'Game' })
    },
  },
  methods: {
    sendInvite(socketId) {
      this.$socket.emit('USER_gameRequest', socketId)
    },
    startGame() {
      console.log(this.numPairs)
      this.$socket.emit('ROOM_startGame', parseInt(this.numPairs))
    },
  },
  mounted() {
    setTimeout(() => {
      this.$socket.emit('ROOM_join', this.$store.getters.roomId)
    }, 1250)
  },
}
</script>
