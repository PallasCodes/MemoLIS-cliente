<template>
  <section id="game" class="flex">
    <ul id="cards-list" class="grid grid-cols-6 gap-2 mr-4 flex-grow">
      <li
        v-for="(card, index) in getCards"
        :key="index"
        @click="flipCard(index)"
        class="card"
        :class="card.animate ? 'animate__animated animate__flipInY' : ''"
      >
        <div
          v-if="card.flipped"
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
          v-if="!card.flipped"
          class="
            h-32
            bg-purple-500
            absolute
            right-0
            left-0
            bottom-0
            z-10
            ease
            duration-500
          "
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
      <ul id="players" class="mt-4 grid grid-cols-1 gap-1">
        <li v-for="player in getPlayers" :key="player.userId">
          <span class="text-lg font-semibold">{{ player.username }}</span>
          <span class="text-gray-400 ml-2">{{ player.score }}pts</span>
        </li>
      </ul>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      cards: [],
      message: '',
      messages: [],
      currentTurn: null,
      card1: null,
      card2: null,
    }
  },
  computed: {
    getPlayers() {
      return this.$store.getters.game.players
    },
    getCards() {
      return this.$store.getters.game.cards
    },
    getMessages() {
      return this.messages
    },
    getTurn() {
      return this.$store.getters.game.turn
    },
  },
  methods: {
    flipCard(index) {
      if (this.getTurn == this.$store.getters.userId) {
        // card flip animation
        this.cards[index].animate = true
        this.cards[index].flipped = true
        setTimeout(() => {
          this.cards[index].animate = false
        }, 2100)

        // cache cards state
        if (!this.card1) {
          this.card1 = this.cards[index]
        } else if (!this.card2) {
          this.card2 = this.cards[index]
          // send turn
          const cards = { card1: this.card1, card2: this.card2 }
          this.$socket.emit('GAME_turn', cards)
          this.card1 = null
          this.card2 = null
        }
      } else {
        console.log('not your turn')
      }
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
    GAME_turn(game) {
      console.log(game)
      this.$store.commit('setGame', game)
    },
  },
  mounted() {
    this.cards = this.$store.getters.game.cards
    this.cards.forEach(card => {
      card.flipped = false
      card.animate = false
    })

    // set turn number
    this.currentTurn = this.$store.getters.game.turn  
  },
}
</script>

<style scoped>
.card {
  @apply bg-purple-500 rounded-xl shadow-sm cursor-pointer h-32 hover:bg-purple-700 transition-colors ease-in duration-200 flex flex-col p-2 relative overflow-hidden;
}
</style>