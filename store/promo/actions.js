import axios from 'axios'

export default {
  getAll (context) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/users/all')
        .then((response) => {
          context.commit('updatePromo', response.data)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  }
}
