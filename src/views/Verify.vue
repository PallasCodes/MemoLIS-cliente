<template>
  <section id="verify" class="text-gray-800 mt-16 font-medium text-2xl text-center">
    <div v-if="validToken">
      <h3>
        Tu cuenta ha sido verificada. Ahora puedes
        <router-link to="/login" class="text-blue-500">iniciar sesión.</router-link>
      </h3>
    </div>
    <div v-if="validToken === false">
      <h3>Token inválido</h3>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Verify',
  data() {
    return {
      validToken: null,
    }
  },
  async mounted() {
    const verificationToken = this.$route.params.token
    await axios
      .post('auth/verify', { verificationToken })
      .then(() => (this.validToken = true))
      .catch((error) => {
        console.error(error)
        this.validToken = false
      })
  },
}
</script>

