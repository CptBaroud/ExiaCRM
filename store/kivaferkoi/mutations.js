export default {
  setPicked (state, size) {
    const temp = []
    // Si le nombre de personne est disponible
    if (size <= state.notYetPicked.length) {
      // On tire normalement les personnes
      pick(state, size, temp)

      // Si le nombre de personne n'est pas disponible
      // mais qu'il reste des gens a tirer dans NotyetPicked
    } else if (state.notYetPicked.length > 0) {
      // Pour chaque personne restant dans le tableau de gens pas encore tiré au sort
      // On les ajoute au tirage et on les sorts de ceux a tiré
      state.notYetPicked.forEach(function (item) {
        temp.push(item)
        state.alreadyPicked.push(item)
      })

      // On update le nombre de personne restant a query
      size = size - temp.length

      // On re-rempli le tableaux de gens à tirer
      // et on vide celui de ceux déja tiré au sort
      state.notYetPicked = state.alreadyPicked
      state.alreadyPicked = []

      // Si il reste des gens a tiré au sort
      if (size > 0) {
        // On ajoutes les personne precedement tiré a ceux deja tiré
        // et on les retire du tirage a venir
        temp.forEach(function (item) {
          state.notYetPicked.splice(state.notYetPicked.indexOf(item), 1)
          state.alreadyPicked.push(item)
        })
        // On tire au sort le nombre de personnes restantes
        pick(state, size, temp)
      }
    } else {
      // Lorsque le tableau de personnes a tiré est vide
      // On reset le systeme et on fait le tirage normalement
      state.notYetPicked = state.alreadyPicked
      state.alreadyPicked = []
      pick(state, size, temp)
    }

    // On push les gens tiré au sort dans le tableau des personnes tirées au sort
    state.picked = temp
  },

  /**
   * Permet de set le state alreadyPicked
   * @param state
   * @param data
   */
  setAlreadyPickedState (state, data) {
    state.alreadyPicked = data
  },

  /**
   * Permet de set le state notYetPicked
   * @param state
   * @param data
   */
  setNotYetPikedState (state, data) {
    state.notYetPicked = data
  },

  /**
   * Permet de set le state Picked
   * @param state
   * @param data
   */
  setPickedArrayState (state, data) {
    state.picked = data
  },

  /**
   * Permet de clear le state alreadyPicked
   * @param state
   * @param data
   */
  clearAlreadyPickedState (state, data) {
    state.alreadyPicked = []
  },

  /**
   * Permet de clear le state notYetPicked
   * @param state
   * @param data
   */
  clearNotYetPikedState (state, data) {
    state.notYetPicked = []
  },

  /**
   * Permet de clear le state Picked
   * @param state
   * @param data
   */
  clearPickedArrayState (state, data) {
    state.Picked = []
  }
}

/**
 * Fonction permettant de recupérer un nombre random
 * entre 0 et la taille de notyetPicked
 * @param state
 * @returns {null|number}
 */
function getRandomInt (state) {
  const size = state.notYetPicked.length
  if (size > 0) {
    return Math.floor(Math.random() * size)
  }
  return null
}

/**
 * Permet de tirer au sort un users
 * @param state
 * @param size
 * @param array
 */
function pick (state, size, array) {
  for (let a = 0; a < size; a++) {
    const random = getRandomInt(state)
    if (random != null) {
      const user = state.notYetPicked[random]
      state.notYetPicked.splice(state.notYetPicked.indexOf(user), 1)
      state.alreadyPicked.push(user)
      array.push(user)
    } else {
      state.notYetPicked = state.alreadyPicked
      state.alreadyPicked = []
    }
  }
}
