<template>
  <section id="login">
    <h2 class="text-3xl text-center font-bold my-6">
      {{ t('pages.signup.title', {}, { locale: $store.getters.lang }) }}
    </h2>
    <form @submit.prevent="signup" class="max-w-xs mx-auto">
      <div class="mb-2">
        <label for="username" class="block">
          {{
            t('pages.signup.form.username', {}, { locale: $store.getters.lang })
          }}
        </label>
        <input
          type="text"
          name="username"
          class="input"
          v-model="formData.username"
          :class="formData.usernameError ? 'inputError' : ''"
        />
        <p v-show="formData.usernameError" class="text-sm text-gray-600">
          {{
            t(
              'pages.signup.form.usernameMsg',
              {},
              { locale: $store.getters.lang }
            )
          }}
        </p>
      </div>
      <div class="mb-2">
        <label for="email" class="block">
          {{
            t('pages.signup.form.email', {}, { locale: $store.getters.lang })
          }}
        </label>
        <input
          type="email"
          name="email"
          class="input"
          v-model="formData.email"
          :class="formData.emailError ? 'inputError' : ''"
        />
        <p v-show="formData.emailError" class="text-sm text-gray-600">
          {{
            t(
              'pages.signup.form.emailMsg',
              {},
              { locale: $store.getters.lang }
            )
          }}
        </p>
      </div>
      <div class="mb-2">
        <label for="password" class="block">
          {{
            t('pages.signup.form.password', {}, { locale: $store.getters.lang })
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
          {{
            t(
              'pages.signup.form.passwordMsg',
              {},
              { locale: $store.getters.lang }
            )
          }}
        </p>
      </div>
      <div class="mb-2">
        <label for="repeatPassword" class="block">
          {{
            t(
              'pages.signup.form.repeatPassword',
              {},
              { locale: $store.getters.lang }
            )
          }}
        </label>
        <input
          type="password"
          name="repeatPassword"
          class="input"
          v-model="formData.repeatPassword"
          :class="formData.repeatPasswordError ? 'inputError' : ''"
        />
        <p v-show="formData.repeatPasswordError" class="text-sm text-gray-600">
          {{
            t('pages.signup.form.repeatPasswordMsg', {}, { locale: $store.getters.lang })
          }}
        </p>
      </div>
      <button
        type="submit"
        class="bg-blue-500 py-1 w-full mt-2 font-medium text-white"
      >
        {{ t('pages.signup.form.btn', {}, { locale: $store.getters.lang }) }}
      </button>
      <span class="mt-6 block"
        >{{ t('pages.signup.form.msg', {}, { locale: $store.getters.lang }) }}
        <router-link class="font-semibold" to="/login">{{
          t('pages.signup.form.cta', {}, { locale: $store.getters.lang })
        }}</router-link></span
      >
    </form>
  </section>
</template>


<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default {
  name: 'SignUp',
  setup() {
    const { t, locale } = useI18n()

    // data
    const formData = ref({
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      usernameError: false,
      passwordError: false,
      repeatPasswordError: false,
      emailError: false,
    })

    function validateData() {
      // reset errors
      formData.value.usernameError = false
      formData.value.passwordError = false
      formData.value.repeatPasswordError = false
      formData.value.emailError = false
      // username validation
      if (formData.value.username.length < 4) {
        formData.value.usernameError = true
      }
      // password validation
      if (formData.value.password.length < 6) {
        formData.value.passwordError = true
      }
      // repeatPassword validation
      if (
        formData.value.repeatPassword !== formData.value.password ||
        formData.value.repeatPassword === ''
      ) {
        formData.value.repeatPasswordError = true
      }
      // email validation
      //eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
      if (!re.test(formData.value.email)) {
        formData.value.emailError = true
      }
      return (
        !formData.value.usernameError &&
        !formData.value.passwordError &&
        !formData.value.repeatPasswordError &&
        !formData.value.emailError
      )
    }

    async function signup() {
      if (validateData()) {
        try {
          await axios.post('/auth/signup', {
            username: formData.value.username,
            password: formData.value.password,
            email: formData.value.email,
          })
          createToast(
            {
              title: 'Yay',
              description:
                'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
            },
            {
              type: 'success',
              hideProgressBar: true,
              transition: 'slide',
              position: 'bottom-right',
              showIcon: true,
            }
          )
        } catch (error) {
          console.error(error)
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

    return { t, locale, formData, validateData, signup }
  },
}
</script>