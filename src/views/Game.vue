<template>
  <section id="game" class="flex">
    <!-- MODAL -->
    <div
      v-if="opened"
      class="
        bg-black bg-opacity-60
        fixed
        top-0
        left-0
        bottom-0
        right-0
        z-10
        flex
        items-center
      "
    >
      <div
        class="
          bg-white
          rounded-md
          shadow-2xl
          py-4
          px-6
          max-w-2xl
          mx-auto
          text-center
        "
      >
        <h2 class="font-semibold text-gray-800 text-2xl mb-2">
          {{ winner.username }} ha ganado el juego con {{ winner.score }}pts
        </h2>
        <h3 class="text-gray-700 text-lg mb-6">
          Puedes continuar chateando en la sala o salir al menú principal
        </h3>
        <router-link to="/" class="font-semibold text-blue-500 mr-5"
          >Menú principal</router-link
        >
        <button
          @click="opened = false"
          class="bg-blue-500 font-semibold text-white px-2 py-1 rounded-md"
        >
          Continuar chateando
        </button>
      </div>
    </div>

    <ul id="cards-list" class="grid grid-cols-6 gap-2 mr-4 flex-grow">
      <li
        v-for="(card, index) in getCards"
        :key="index"
        @click="flipCard(index)"
        class="card"
      >
        <div
          v-if="card.player"
          class="h-32 bg-white p-2 border-2 border-gray-400 rounded-xl"
        >
          <div class="h-20">
            <img :src="card.imgUrl" class="object-contain h-full" />
          </div>
          <span class="block text-lg mt-1 text-gray-800 font-medium">{{
            card.name
          }}</span>
        </div>
        <div v-if="!card.player" class="h-32 bg-purple-500"></div>
      </li>
    </ul>
    <aside class="w-80">
      <div
        id="chat"
        class="
          overflow-y-scroll
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
          <span
            class="text-lg font-semibold"
            :class="
              getTurn === player.userId ? '' : 'text-blue-500 font-bold'
            "
            >{{ player.username }}</span
          >
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
      winner: null,
      opened: false,
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
      const card = this.$store.getters.game.cards[index]
      // check if it's the player's turn and the card isn't flipped yet
      if (this.getTurn == this.$store.getters.userId && !card.player) {
        // card flip animation
        this.$store.commit('flipCard', {
          index,
          player: this.$store.getters.userId,
        })

        // cache cards state
        if (!this.card1) {
          this.card1 = this.cards[index]
          this.$store.commit('flipCard', {
            index,
            player: this.$store.getters.userId,
          })
        } else if (!this.card2) {
          this.card2 = this.cards[index]
          // send turn
          this.$socket.emit('GAME_turn', {
            card1: this.card1,
            card2: this.card2,
          })
          // reset selection cards state
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
      this.$store.commit('setGame', game)
    },
    GAME_gameOver(game) {
      this.$store.commit('setGame', game)
      this.opened = true
      this.winner = game.winner
    },
  },
  mounted() {
    this.cards = this.$store.getters.game.cards
    this.currentTurn = this.$store.getters.game.turn
  },
}
</script>

<style scoped>
.card {
  @apply bg-purple-500 rounded-xl shadow-sm cursor-pointer h-32 flex flex-col p-2 relative overflow-hidden;
}
</style>