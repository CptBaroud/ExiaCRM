export default {
  getRandom: (context, size) => {
    context.commit('setPicked', size)
  }
}
