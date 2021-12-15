<template>
  <section id="signup">
    <h2 class="text-3xl text-center font-bold my-6">
      {{ t('pages.login.title', {}, { locale: $store.getters.lang }) }}
    </h2>
    <form @submit.prevent="login" class="max-w-xs mx-auto">
      <div class="mb-3">
        <label for="email" class="block">
          {{ t('pages.login.form.email', {}, { locale: $store.getters.lang }) }}
        </label>
        <input
          type="email"
          name="email"
          class="input"
          v-model="formData.email"
          :class="formData.emailError ? 'inputError' : ''"
        />
        <p v-show="formData.emailError" class="text-sm text-gray-600">
          {{ formData.emailMsg }}
        </p>
      </div>
      <div class="mb-3">
        <label for="password" class="block">
          {{
            t('pages.login.form.password', {}, { locale: $store.getters.lang })
          }}
        </label>
        <input
          type="password"
          name="password"
          class="input"
          v-model="formData.password"
          :class="formData.passwordError ? 'inputError' : ''"
        />
        <p v-show="formData.passwordError" class="text-sm text-gray-600">
          {{ formData.passwordMsg }}
        </p>
      </div>
      <button
        type="submit"
        class="bg-blue-500 py-1 w-full mt-2 font-medium text-white"
      >
        {{ t('pages.login.form.btn', {}, { locale: $store.getters.lang }) }}
      </button>
      <span class="mt-6 block">
        {{ t('pages.login.form.msg', {}, { locale: $store.getters.lang }) }}
        <router-link class="font-semibold" to="/signup">{{
          t('pages.login.form.cta', {}, { locale: $store.getters.lang })
        }}</router-link></span
      >
    </form>
  </section>
</template>


<script>
import { useI18n } from 'vue-i18n'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

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
        emailError: false,
        passwordError: false,
        emailMsg: '',
        passwordMsg: '',
      },
      lang: 'es',
    }
  },
  methods: {
    validateForm() {
      // reset errors
      this.formData.emailError = false
      this.formData.passwordError = false
      // email validation
      //eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
      if (this.formData.email == '') {
        this.formData.emailError = true
        this.formData.emailMsg = 'Introduce tu correo'
      }
      if (!re.test(this.formData.email)) {
        this.formData.emailError = true
        this.formData.emailMsg = 'Introduce un correo válido'
      }
      // password validation
      if (this.formData.password == '') {
        this.formData.passwordError = true
        this.formData.passwordMsg = 'Introduce tu contraseña'
      }
      if (this.formData.password.length <= 6) {
        this.formData.passwordError = true
        this.formData.passwordMsg =
          'La contraseña debe ser mayor a 6 caracteres'
      }
      return !this.formData.passwordError && !this.formData.emailError
    },
    toggleLang() {
      this.lang === 'es' ? (this.lang = 'en') : (this.lang = 'es')
    },
    async login() {
      if (this.validateForm()) {
        try {
          await this.$store.dispatch('login', this.formData)
          const redirectUrl = '/' + (this.$route.query.redirect || '')
          if (this.$store.getters.isAuthenticated) {
            this.$socket.emit('USER_login', {
              userId: this.$store.getters.userId,
              username: this.$store.getters.username,
            })
          }
          this.$router.replace(redirectUrl)
        } catch (error) {
          console.error(error)
          if (error.response.status == 403) {
             createToast(
              {
                title: 'Error',
                description:
                  'No haz verificado tu email.',
              },
              {
                type: 'warning',
                hideProgressBar: true,
                transition: 'slide',
                position: 'bottom-right',
                showIcon: true,
              }
            )
          } else {
            createToast(
              {
                title: 'Error',
                description:
                  'Ocurrió un error en el servidor. Inténtalo más tarde.',
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
        }
      }
    },
  },
}
</script>