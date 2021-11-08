export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userId = payload.userId
    state.username = payload.username
  },
  addFriend(state, payload) {
    state.friends.push(payload)
  },
  setOnlinePlayers(state, payload) {
    state.onlinePlayers = payload
  },
  removeOnlinePlayer(state, payload) {
    state.onlinePlayers = state.onlinePlayers.filter(player => player.id !== payload)
  },
  addOnlinePlayer(state, payload) {
    state.onlinePlayers.push(payload)
  },
  setRoomId(state, payload) {
    state.roomId = payload
  },
  setGame(state, payload) {
    state.game = payload
  }
}