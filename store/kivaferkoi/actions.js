import axios from 'axios'

export default {
  /**
   * Permet de tirer de maniere random
   * un nombre donné d'utilisateurs
   * @param context
   * @param size
   */
  getRandom: (context, size) => {
    context.commit('setPicked', size)
  },

  /**
   * Permet de récupérer les users déjà tirés
   * @param context
   * @returns {Promise<unknown>}
   */
  getAlreadyPicked (context) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/kivaferkoi/alreadyPicked')
        .then((response) => {
          context.commit('setAlreadyPickedState', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet de recuperer les users en attente d'etre tiré au sort
   * @param context
   * @returns {Promise<unknown>}
   */
  getNotYetPicked (context) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/kivaferkoi/NotYetPicked')
        .then((response) => {
          context.commit('setNotYetPikedState', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet de récuperer les users tirés au sort
   * @param context
   * @returns {Promise<unknown>}
   */
  getPicked (context) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + '/kivaferkoi/Picked')
        .then((response) => {
          context.commit('setPickedArrayState', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet de reset la table contenant les users déjà tirés au sort
   * @param context
   * @returns {Promise<unknown>}
   */
  clearAlreadyPicked () {
    return new Promise((resolve, reject) => {
      axios.delete(process.env.API_URL + '/kivaferkoi/alreadyPicked')
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet de reset la table contenant les users en attente d'etre tirés au sort
   * @param context
   * @returns {Promise<unknown>}
   */
  clearNotYetPicked () {
    return new Promise((resolve, reject) => {
      axios.delete(process.env.API_URL + '/kivaferkoi/notYetPicked')
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet de reset la table contenant les users tirés au sort
   * @param context
   * @returns {Promise<unknown>}
   */
  clearPicked () {
    return new Promise((resolve, reject) => {
      axios.delete(process.env.API_URL + '/kivaferkoi/picked')
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet d'envoyer les users déjàa tiré au sort dans la base de données
   * @param context
   * @returns {Promise<unknown>}
   */
  fillAlreadyPicked (context, data) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + '/kivaferkoi/alreadyPicked', { alreadyPicked: data })
        .then((response) => {
          context.commit('setAlreadyPickedState', data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet d'envoyer les users déjàa tiré au sort dans la base de données
   * @param context
   * @returns {Promise<unknown>}
   */
  fillNotYetPicked (context, data) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + '/kivaferkoi/notYetPicked', { notYetPicked: data })
        .then((response) => {
          context.commit('setNotYetPickedState', data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Permet d'envoyer les users déjàa tiré au sort dans la base de données
   * @param context
   * @returns {Promise<unknown>}
   */
  fillPicked (context, data) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + '/kivaferkoi/picked', { picked: data })
        .then((response) => {
          context.commit('setPickedState', data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  }
}
