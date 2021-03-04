import axios from 'axios'

export default {
  fetch: (context, token) => {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/prosit', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          console.log(response.data)
          context.commit('fillProsit', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  },

  add: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/prosit', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('addProsit', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  }

}
