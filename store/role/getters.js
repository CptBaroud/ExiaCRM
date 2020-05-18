export default {
  role (state) {
    return state.role
  },
  numProsit (state) {
    return state.numProsit
  },
  equipe (state) {
    return state.equipe
  },
  currentEquipe (state) {
    const out = []

    state.role.forEach(function (item) {
      if (item.equipe === state.equipe) {
        out.push({
          role: 'Animateur',
          user: item.Animateur,
          avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
        })
        out.push({
          role: 'Secretaire',
          user: item.Secretaire,
          avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
        })
        out.push({
          role: 'Scribe',
          user: item.Scribe,
          avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
        })
        out.push({
          role: 'Gestionaire',
          user: item.Gestionaire,
          avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
        })
      }
    })

    return out
  }
}
