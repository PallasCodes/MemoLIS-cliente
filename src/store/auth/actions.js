import axios from 'axios'
import router from '../../router/index'

export default {
  // gets triggered when user presses the log in buton
  async login(context, payload) {
    try {
      const response = await axios.post('/auth/login', payload)
      // set localStorage variables
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('username', response.data.username)
      // set user in vuex
      context.commit('setUser', {
        token: response.data.token,
        userId: response.data.userId,
        username: response.data.username,
      })
      // set axios Authorization header
      axios.defaults.headers.common['Authorization'] =
        'Bearear ' + response.data.token
      await context.dispatch('getFriendsList')
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // gets triggered when user presses the logout button
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    context.commit('setUser', {
      token: null,
      userId: null,
    })
    axios.defaults.headers.common['Authorization'] = ''
    router.replace('/login')
  },

  // gets automatically triggered when the app starts
  async autoLogin(context) {
    // get localStorage variables
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    // validate localStorage variables
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        username,
      })
      // set axios Authorization header
      axios.defaults.headers.common['Authorization'] = 'Bearear ' + token
      await context.dispatch('getFriendsList')
    }
  },

  // gets triggered when user log's in, to cache the his friends list
  async getFriendsList(context) {
    try {
      const response = await axios.get('/user/friends')
      response.data.friends.map((friendship) => {
        // identify who's the friend and who's the current user in the FRIENDSHIP
        friendship.user1 == context.getters.userId
          ? context.commit('addFriend', {
              date: friendship.createdAt,
              user: friendship.user2,
            })
          : context.commit('addFriend', {
              date: friendship.createdAt,
              user: friendship.user1,
            })
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
