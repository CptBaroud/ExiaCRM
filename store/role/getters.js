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
          icon: 'mdi-account-tie'
        })
        out.push({
          role: 'Secretaire',
          user: item.Secretaire,
          icon: 'mdi-account-search'
        })
        out.push({
          role: 'Scribe',
          user: item.Scribe,
          icon: 'mdi-account-edit'
        })
        out.push({
          role: 'Gestionaire',
          user: item.Gestionaire,
          icon: 'mdi-account-clock'
        })
      }
    })

    return out
  }
}
