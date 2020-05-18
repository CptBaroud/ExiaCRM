import axios from 'axios'

export default {
  uploadFile: (context, object) => {
    console.dir(object)
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + '/upload', object)
        .then((response) => {
          context.commit('addFile', response.data)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
