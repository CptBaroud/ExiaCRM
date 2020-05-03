import axios from 'axios'
// import multer from 'multer'

export default {
  uploadFile: (context, pa) => {
    /* const upload = multer({
      dest: './pa'
    }) */

    return new Promise((resolve, reject) => {
      axios.post('/pa', pa, {
        headers: {
          ContentType: 'multipart/form-data'
        }
      }).then((response) => {
        context.commit('addFile', response.data)
        resolve(response.data)
      }).catch((onerror) => {
        reject(onerror)
      })
    })
  }
}
