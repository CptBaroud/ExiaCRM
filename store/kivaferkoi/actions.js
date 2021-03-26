import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/kivaferkoi', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('fillKivaferkoi', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  },

  shuffle (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/kivaferkoi/shuffle', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('fillKivaferkoi', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  }
}
