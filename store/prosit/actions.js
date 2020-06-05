import axios from 'axios'

export default {
  fillKeywords: (context, pa) => {
    context.commit('fillKeywords', pa)
  },
  fillContext: (context, pa) => {
    context.commit('fillContext', pa)
  },
  fillConstraints: (context, pa) => {
    context.commit('fillConstraints', pa)
  },
  filGeneralisation: (context, pa) => {
    context.commit('filGeneralisation', pa)
  },
  fillProblematics: (context, pa) => {
    context.commit('fillProblematics', pa)
  },
  fillhypothesises: (context, pa) => {
    context.commit('fillhypothesises', pa)
  },
  fillPa: (context, pa) => {
    context.commit('fillPa', pa)
  },

  addCer: (context, pa) => {
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + '/prosit/', pa)
        .then((response) => {
          context.commit('addCer', pa)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  },

  getCer: (context, numProsit) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/prosit/' + numProsit)
        .then((response) => {
          context.commit('addCer', response.data)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  },

  getAllPa: (context) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/prosit/get/all')
        .then((response) => {
          context.commit('fillAllPa', response.data)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  },

  getKeyword: (context) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/prosit/get/allKeywords')
        .then((response) => {
          context.commit('fillKeywords', response.data)
          resolve(response.data)
        }).catch((onerror) => {
          reject(onerror)
        })
    })
  },

  editKeyword: (context, data) => {
    return new Promise((resolve, reject) => {
      axios.put(process.env.API_URL + '/prosit/update/keyword', { keyword: data })
        .then((response) => {
          context.commit('editKeyword', response.data)
          resolve(response.data)
        }).catch((onerror) => {
          reject(onerror)
        })
    })
  }
}
