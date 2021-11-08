import axios from 'axios'
import router from '../../router/index'

export default {
  async login(context, payload) {
    try {
      const response = await axios.post('/auth/login', payload)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('username', response.data.username)
      context.commit('setUser', {
        token: response.data.token,
        userId: response.data.userId,
        username: response.data.username
      })
      axios.defaults.headers.common['Authorization'] =
        'Bearear ' + response.data.token
      context.dispatch('getFriendsList')
    } catch (error) {
      console.error(error)
    }
  },
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
  autoLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        username
      })
      axios.defaults.headers.common['Authorization'] = 'Bearear ' + token
      context.dispatch('getFriendsList')
    }
  },
  getFriendsList(context) {
    axios
      .get('/user/friends')
      .then((response) => {
        response.data.friends.map((friendship) => {
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
      })
      .catch((error) => console.error(error))
  },
}
