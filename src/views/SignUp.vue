<template>
  <section id="login">
    <h2 class="text-2xl text-center font-bold my-4">Registro</h2>
    <form @submit.prevent="signup" class="max-w-xs mx-auto">
      <div class="mb-2">
        <label for="username" class="block">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          class="w-full text-gray-600 py-1 px-2 rounded-md"
          v-model="formData.username"
        />
      </div>
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
      <div class="mb-2">
        <label for="repeatPassword" class="block">Repetir Contraseña</label>
        <input
          type="password"
          name="repeatPassword"
          class="w-full text-gray-600 py-1 px-2 rounded-md"
        />
      </div>
      <button type="submit" class="bg-blue-500 py-1 w-full mt-2">Enviar</button>
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
        email: '',
      },
    }
  },
  methods: {
    async signup() {
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
            hideProgressBar: 'true',
            transition: 'slide',
            position: 'bottom-right',
            showIcon: 'true'
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
            hideProgressBar: 'true',
            transition: 'slide',
            position: 'bottom-right',
            showIcon: 'true'
          }
        )
      }
    },
  },
}
</script>