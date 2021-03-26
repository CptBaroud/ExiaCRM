export default {
  set (state, data) {
    state.team = data
  },

  add (state, data) {
    state.team.push(data)
  },

  setCurrentTeam (state, data) {
    state.currentTeam = data
  },

  getCurentTeam (state, data) {
    state.currentTeam = state.team[data]
  }
}
