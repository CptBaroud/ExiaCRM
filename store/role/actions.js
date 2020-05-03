export default {
  updateProsit: (context, value) => {
    context.commit('updateProsit', value)
    const equipe = (value % 11) + 1
    context.commit('updateEquipe', equipe)
  },
  addApporteurs: (data, value) => {

  },
  editApporteurs: (data, value) => {

  }
}
