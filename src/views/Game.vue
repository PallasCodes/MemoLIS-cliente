<template>
  <section id="game" class="flex">
    <ul id="cards-list" class="grid grid-cols-6 gap-2 mr-4 flex-grow">
      <li
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
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
        <ul id="messages" class="h-full"></ul>
        <input
          type="text"
          placeholder="Escribe algo..."
          class="border p-2 w-full text-sm outline-none"
        />
      </div>
      <div id="players" class="mt-4 text-lg font-medium grid grid-cols-1 gap-1">
        <p>
          Pallas <span class="text-sm font-normal text-gray-500">5 pts</span>
          <span class="ml-3 font-normal">{{ timeLeft }}</span>
        </p>
        <p>
          Bernardo <span class="text-sm font-normal text-gray-500">0 pts</span>
        </p>
        <p>
          David <span class="text-sm font-normal text-gray-500">10 pts</span>
        </p>
        <p>UwU <span class="text-sm font-normal text-gray-500">5 pts</span></p>
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
    }
  },
  methods: {
    initTimer() {
      const timer = setInterval(() => {
        if (this.timeLeft <= 0)
          clearInterval(timer)
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
  },
  mounted() {
    this.cards = this.$store.getters.game.cards
  },
}
</script>

<style scoped>
li {
  @apply bg-purple-500 rounded-xl shadow-sm cursor-pointer h-32 hover:bg-purple-700 transition-colors ease-in duration-200 flex flex-col p-2 relative overflow-hidden;
}
</style>