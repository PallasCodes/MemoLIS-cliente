<template>
  <div class="max-w-6xl mx-auto relative px-4">
    <TheNavbar />
    <div class="pt-4">
      <transition name="route" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>


<script>
import TheNavbar from './components/layout/TheNavbar.vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
  components: {
    TheNavbar,
  },
  async mounted() {
    try {
      await this.$store.dispatch('autoLogin')
      if (this.$store.getters.isAuthenticated) {
        this.$socket.emit('USER_login', {
          userId: this.$store.getters.userId,
          username: this.$store.getters.username,
        })
      }
    } catch (error) {
      createToast(
        {
          title: 'Error',
          description: 'Ocurrió un error en el servidor. Inténtalo más tarde.',
        },
        {
          type: 'danger',
          hideProgressBar: true,
          transition: 'slide',
          position: 'bottom-right',
          showIcon: true,
        }
      )
    }
  },
}
</script>


<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.4s ease-out;
}
.route-leave-active {
  transition: all 0.4s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>