export default {
  updatePromo (state, data) {
    const out = []
    state.promo.forEach(function (item) {
      data.forEach(function (data) {
        if (item.name === data.name) {
          out.push({
            name: item.name,
            username: item.username,
            avatar: data.avatar
          })
        }
      })
    })

    state.promo = out
  }
}
