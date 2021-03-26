export default {
  set (state, data) {
    state.conf = data
  },

  changeAddTeamModal (state, data) {
    state.addTeamModal = data
  },

  updateNumProsit (state, data) {
    console.log(data)
    state.conf.numProsit = data.numProsit
  }
}
