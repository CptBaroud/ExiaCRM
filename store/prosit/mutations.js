export default {
  fillProsit (state, data) {
    console.log(data)
    state.prosits = data
    console.log(state.prosits)
  },

  addProsit (state, data) {
    state.prosits.push(data)
  }
}
