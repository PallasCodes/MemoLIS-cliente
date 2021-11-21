import mutations from './mutations.js'
import actions from './actions'
import getters from './getters.js'

export default {
  state() {
    return {
      userId: null,
      token: null,
      username: null,
      roomId: null,
      friends: [],
      onlinePlayers: [],
      game: null,
      lang: 'es',
    }
  },
  mutations,
  getters,
  actions,
}
