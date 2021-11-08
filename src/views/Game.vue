<template>
  <section id="game" class="flex">
    <ul id="cards-list" class="grid grid-cols-6 gap-2 mr-4 flex-grow">
      <li
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
        class="card"
        :class="card.animate ? 'animate__animated animate__flipInY' : ''"
      >
        <div
          class="
            absolute
            top-0
            right-0
            left-0
            bottom-0
            bg-white
            p-2
            border-2 border-gray-400
            rounded-xl
          "
        >
          <div class="h-20">
            <img :src="card.imgUrl" class="object-contain h-full" />
          </div>
          <span class="block text-lg mt-1 text-gray-800 font-medium">{{
            card.name
          }}</span>
        </div>
        <div
          class="
            h-32
            bg-purple-500
            absolute
            right-0
            left-0
            bottom-0
            z-10
            transition-opacity
            ease
            duration-500
          "
          :class="card.flipped ? 'opacity-0' : 'opacity-100'"
        ></div>
      </li>
    </ul>
    <aside class="w-80">
      <div
        id="chat"
        class="
          border-2 border-gray-500
          rounded-lg
          overflow-hidden
          h-80
          flex flex-col
          shadow
        "
      >
        <ul id="messages" class="h-full p-2 text-sm text-gray-700">
          <li v-for="(message, index) in getMessages" :key="index">
            {{ message.username }} - {{ message.text }}
          </li>
        </ul>
        <form @submit.prevent="sendMessage">
          <input
            v-model="message"
            type="text"
            placeholder="Escribe algo..."
            class="border p-2 w-full text-sm outline-none"
          />
        </form>
      </div>
      <div id="players" class="mt-4 grid grid-cols-1 gap-1">
        <p v-for="player in getPlayers" :key="player.userId">
          <span class="text-lg font-semibold">{{ player.username }}</span>
          <span class="text-gray-400 ml-2">{{ player.score }}pts</span>
        </p>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      timeLeft: 10,
      cards: [],
      message: '',
      messages: [],
    }
  },
  computed: {
    getPlayers() {
      return this.$store.getters.game.players
    },
    getMessages() {
      return this.messages
    },
  },
  methods: {
    initTimer() {
      const timer = setInterval(() => {
        if (this.timeLeft <= 0) clearInterval(timer)
        this.timeLeft--
      }, 1000)
    },
    flipCard(index) {
      this.initTimer()
      this.cards[index].animate = true
      this.cards[index].flipped = !this.cards[index].flipped
      setTimeout(() => {
        this.cards[index].animate = false
      }, 2100)
    },
    sendMessage() {
      this.$socket.emit('GAME_message', this.message)
      this.message = ''
    },
  },
  sockets: {
    GAME_message(message) {
      this.messages.push(message)
    },
  },
  mounted() {
    this.cards = this.$store.getters.game.cards
  },
}
</script>

<style scoped>
.card {
  @apply bg-purple-500 rounded-xl shadow-sm cursor-pointer h-32 hover:bg-purple-700 transition-colors ease-in duration-200 flex flex-col p-2 relative overflow-hidden;
}
</style>