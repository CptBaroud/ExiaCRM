export default {
  fillProsit (state, data) {
    state.prosits = data
  },

  addProsit (state, data) {
    state.prosits.push(data)
  },

  editProsit (state, data) {
    // On récupère le prosit à update
    const index = state.prosits.findIndex((item) => {
      return item._id === data._idProsit
    })

    // On récupère le keyword a update
    const keywordIndex = state.prosits[index].keywords.findIndex((item) => {
      return item._id === data.keyword._id
    })

    // On le modifie
    state.prosits[index].keywords[keywordIndex].def = data.keyword.def
  }
}
