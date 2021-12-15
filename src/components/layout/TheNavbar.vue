<template>
  <nav
    class="sticky w-full py-3 flex justify-between items-center text-blue-600"
  >
  <!-- NOTIFICATION SOUND -->
  <audio src="/sounds/notif.ogg" ref="notif"></audio>

    <div class="flex items-center">
      <img src="/favicon.png" alt="MemoKIS icon" class="mr-3 h-6 w-6" />
      <h1 class="text-3xl font-bold">MemoLIS</h1>
    </div>
    <div class="flex items-center justify-center">
      <button class="relative" @click="openNotifications" v-if="isLoggedIn">
        <div class="relative">
          <div
            v-if="notifications.length > 0"
            class="
              flex
              items-center
              absolute
              text-red
              bg-gray-200
              text-xs
              rounded-full
              text-center
              top-0
              right-0
            "
            style="width: 18px; height: 18px; margin-top: -6px"
          >
            <span style="margin-left: 5.5px; font-weight: 500">
              {{ notifications.length }}</span
            >
          </div>
          <!-- FULL BELL icon -->
          <svg
            v-if="notifAreOpened"
            xmlns="http://www.w3.org/2000/svg"
            class="nav-btn mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
          </svg>
          <!-- end FULL BELL icon -->

          <!-- BELL icon -->
          <svg
            v-if="!notifAreOpened"
            xmlns="http://www.w3.org/2000/svg"
            class="nav-btn mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <!-- end BELL icon -->
        </div>
        <!-- NOTIFICATIONS -->
        <div
          v-if="openedNotif && notifications.length >= 1"
          class="
            absolute
            bg-white
            w-72
            right-0
            p-4
            text-gray-700
            rounded-md
            shadow
            border border-gray-100
            mt-2
          "
        >
          <div v-for="notification in notifications" :key="notification.id">
            <div v-if="notification.type === 'friendRequest'">
              <b>{{ notification.userId }}</b> te ha enviado una solicitud de
              amistad
              <span class="block mt-1">
                <button
                  @click="
                    respondRequest(false, notification.id, notification.userId)
                  "
                  class="text-blue-500 text-xs"
                >
                  Rechazar
                </button>
                <button
                  @click="
                    respondRequest(true, notification.id, notification.userId)
                  "
                  class="
                    text-xs
                    font-medium
                    bg-blue-500
                    py-1
                    px-2
                    rounded
                    ml-2
                    text-white
                  "
                >
                  Aceptar
                </button>
              </span>
            </div>
            <div v-else-if="notification.type === 'gameRequest'">
              <b>{{ notification.username }}</b> te ha invitado a jugar
              <span class="block mt-1">
                <button
                  @click="respondGameRequest(false, notification.roomId)"
                  class="text-blue-500 text-xs"
                >
                  Rechazar
                </button>
                <button
                  @click="respondGameRequest(true, notification.roomId)"
                  class="
                    text-xs
                    font-medium
                    bg-blue-500
                    py-1
                    px-2
                    rounded
                    ml-2
                    text-white
                  "
                >
                  Aceptar
                </button>
              </span>
            </div>
          </div>
        </div>
        <!-- end NOTIFICATIONS -->
      </button>

      <div class="relative">
        <button @click="langOpened = !langOpened">
          <!-- LANG icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="nav-btn mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          <!-- end LANG icon -->
        </button>
        <div
          v-if="langOpened"
          class="
            absolute
            bg-white
            right-0
            text-gray-700
            rounded-md
            shadow
            border border-gray-100
            mt-2
          "
        >
          <button
            class="block hover:bg-gray-100 px-6 py-2 w-full"
            @click="toggleLang('es')"
          >
            Español
          </button>
          <button
            class="block hover:bg-gray-100 px-6 py-2 w-full"
            @click="toggleLang('en')"
          >
            English
          </button>
        </div>
      </div>

      <!-- LOGOUT icon -->
      <svg
        v-if="isLoggedIn"
        xmlns="http://www.w3.org/2000/svg"
        class="nav-btn"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="logout"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <!-- end LOGOUT icon -->
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheNavbar',
  data() {
    return {
      notifications: [],
      notifAreOpened: false,
      langOpened: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    openedNotif() {
      return this.notifAreOpened
    },
  },
  sockets: {
    USER_friendRequest(notification) {
      notification.type = 'friendRequest'
      this.notifications.push(notification)
    },
    USER_gameRequest(notification) {
      notification.type = 'gameRequest'
      this.notifications.push(notification)
      this.$refs.notif.play()
    },
  },
  methods: {
    toggleLang(lang) {
      if (lang != this.$store.getters.lang) this.$store.commit('setLang', lang)
      this.langOpened = false
    },
    logout() {
      this.$store.dispatch('logout')
    },
    openNotifications() {
      this.notifAreOpened = !this.notifAreOpened
    },
    respondRequest(response, notifId, sentTo) {
      axios
        .post('/user/friend-request', { response, notifId, sentTo })
        .then(() => {
          this.notifications = this.notifications.filter((notif) => {
            notif.id != notifId
          })
        })
        .catch((error) => console.error(error))
    },
    respondGameRequest(response, roomId) {
      if (response === true) {
        this.$store.commit('setRoomId', roomId)
        this.$router.replace({ name: 'Lobby' })
      }
    },
  },
}
</script>
