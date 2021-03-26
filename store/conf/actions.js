import axios from 'axios'

export default {
  fetch: (context, token) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/conf', {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          context.commit('set', response.data)
          resolve(response.data)
        })
        .catch((onerror) => {
          reject(onerror)
        })
    })
  },

  updateNumProsit: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/conf/prosit', {
        numProsit: data.value
      }, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          context.commit('updateNumProsit', response.data)
          resolve(response.data)
        })
        .catch((onerror) => {
          reject(onerror)
        })
    })
  }
}
