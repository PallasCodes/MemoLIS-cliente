<template>
  <section id="signup">
    <button @click="toggleLang">Cambiar idioma</button>
    <h1>{{ t('test', {}, { locale: lang }) }}</h1>
    <h2 class="text-2xl text-center font-bold my-4">Iniciar sesión</h2>
    <form @submit.prevent="login" class="max-w-xs mx-auto">
      <div class="mb-2">
        <label for="email" class="block">Correo</label>
        <input
          type="email"
          name="email"
          class="w-full text-gray-600 py-1 px-2 rounded-md"
          v-model="formData.email"
        />
      </div>
      <div class="mb-2">
        <label for="password" class="block">Contraseña</label>
        <input
          type="password"
          name="password"
          class="w-full text-gray-600 py-1 px-2 rounded-md"
          v-model="formData.password"
        />
      </div>
      <button type="submit" class="bg-blue-500 py-1 w-full mt-2">Enviar</button>
      <span class="mt-6 block"
        >¿No tienes cuenta?
        <router-link class="font-semibold" to="/signup"
          >registrate</router-link
        ></span
      >
    </form>
  </section>
</template>


<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Login',
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      lang: 'es',
    }
  },
  methods: {
    toggleLang() {
      this.lang === 'es' ? (this.lang = 'en') : (this.lang = 'es')
    },
    async login() {
      await this.$store.dispatch('login', this.formData)
      const redirectUrl = '/' + (this.$route.query.redirect || '')
      if (this.$store.getters.isAuthenticated) {
        this.$socket.emit('USER_login', {
          userId: this.$store.getters.userId,
          username: this.$store.getters.username,
        })
      }
      this.$router.replace(redirectUrl)
    },
  },
}
</script>