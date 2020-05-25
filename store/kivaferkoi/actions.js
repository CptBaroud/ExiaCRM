export default {
  getRandom: (context, size) => {
    context.commit('setPicked', size)
  },
  aupdateAlreadyPicked (context, data) {
    context.commit('updateAlreadyPicked', data)
  }
}
