<template>
  <section id="login">
    <h2 class="text-3xl text-center font-bold my-6">Registro</h2>
    <form @submit.prevent="signup" class="max-w-xs mx-auto">
      <div class="mb-2">
        <label for="username" class="block">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          class="input"
          v-model="formData.username"
          :class="formData.usernameError ? 'inputError' : ''"
        />
        <p v-show="formData.usernameError" class="text-sm text-gray-600">
          {{ formData.usernameMsg }}
        </p>
      </div>
      <div class="mb-2">
        <label for="email" class="block">Correo</label>
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
      <div class="mb-2">
        <label for="password" class="block">Contraseña</label>
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
      <div class="mb-2">
        <label for="repeatPassword" class="block">Repetir Contraseña</label>
        <input
          type="password"
          name="repeatPassword"
          class="input"
          v-model="formData.repeatPassword"
          :class="formData.repeatPasswordError ? 'inputError' : ''"
        />
        <p v-show="formData.repeatPasswordError" class="text-sm text-gray-600">
          {{ formData.repeatPasswordMsg }}
        </p>
      </div>
      <button
        type="submit"
        class="bg-blue-500 py-1 w-full mt-2 font-medium text-white"
      >
        Crear cuenta
      </button>
      <span class="mt-6 block"
        >¿Ya tienes cuenta?
        <router-link class="font-semibold" to="/login"
          >inicia sesión</router-link
        ></span
      >
    </form>
  </section>
</template>


<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        username: '',
        password: '',
        repeatPassword: '',
        email: '',
        usernameError: false,
        passwordError: false,
        repeatPasswordError: false,
        emailError: false,
        usernameMsg: '',
        passwordMsg: '',
        repeatPasswordMsg: '',
        emailMsg: '',
      },
    }
  },
  methods: {
    validateData() {
      // reset errors
      this.formData.usernameError = false
      this.formData.passwordError = false
      this.formData.repeatPasswordError = false
      this.formData.emailError = false
      // username validation
      if (this.formData.username.length < 4) {
        this.formData.usernameError = true
        this.formData.usernameMsg =
          'Introduce un nombre de usuario mayor a 4 caracteres'
      }
      // password validation
      if (this.formData.password.length < 6) {
        this.formData.passwordError = true
        this.formData.passwordMsg =
          'Introduce una contraseña mayor a 6 caracteres'
      }
      // repeatPassword validation
      if (
        this.formData.repeatPassword !== this.formData.password ||
        this.formData.repeatPassword === ''
      ) {
        this.formData.repeatPasswordError = true
        this.formData.repeatPasswordMsg = 'Las contraseñas deben de coincidir'
      }
      // email validation
      //eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
      if (!re.test(this.formData.email)) {
        this.formData.emailError = true
        this.formData.emailMsg = 'Introduce un correo con formato válido'
      }
      return (
        !this.formData.usernameError &&
        !this.formData.passwordError &&
        !this.formData.repeatPasswordError &&
        !this.formData.emailError
      )
    },
    async signup() {
      if (this.validateData()) {
        try {
          await axios.post('/auth/signup', {
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
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
    },
  },
}
</script>