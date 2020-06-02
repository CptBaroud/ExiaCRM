export default {
  pa (state) {
    const out = []
    state.pa.forEach(function (item) {
      out.push(item.name)
    })
    return out
  },
  cer (state) {
    return state.cer
  },
  allPa (state) {
    return state.allPa
  },
  keywords (state) {
    return state.keywords
  }
}
