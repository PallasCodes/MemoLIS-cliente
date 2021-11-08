export default {
  userId(state) {
    return state.userId
  },
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    return !!state.token
  },
  onlinePlayers(state) {
    return state.onlinePlayers
  },
  friends(state) {
    return state.friends
  },
  username(state) {
    return state.username
  },
  roomId(state) {
    return state.roomId
  }
}
