import axios from 'axios'

export default {
  updateProsit: (context, value) => {
    context.commit('updateProsit', value)
    const equipe = (value % 11) + 1
    context.commit('updateEquipe', equipe)
  },

  getNumProsit: (context) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/prosit/get/numProsit')
        .then((response) => {
          context.commit('updateProsit', response.data[0].num_prosit)
          const equipe = (response.data[0].num_prosit % 11) + 1
          context.commit('updateEquipe', equipe)
          resolve(response.data)
        })
        .catch((onerror) => {
          reject(onerror)
        })
    })
  },

  updateNumProsit: (context, data) => {
    return new Promise((resolve, reject) => {
      axios.put(process.env.API_URL + '/prosit/update/numProsit', { num_prosit: data })
        .then((response) => {
          context.commit('updateProsit', data)
          const equipe = (data % 11) + 1
          context.commit('updateEquipe', equipe)
          resolve(response.data)
        })
        .catch((onerror) => {
          reject(onerror)
        })
    })
  }
}
