export default {
  pa (state) {
    const out = []
    state.pa.forEach(function (item) {
      out.push(item.name)
    })
    return out
  }
}
