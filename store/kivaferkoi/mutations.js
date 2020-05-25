export default {
  setPicked (state, size) {
    const temp = []
    // Si le nombre de personne est disponible
    if (size <= state.notYetPicked.length) {
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
  /*
    Mouvement d'NYP vers AP
   */
  setAlreadypicked (state, data) {
    state.alreadyPicked.push(data)
    state.notYetPicked.slice(state.notYetPicked.indexOf(data.name), 1)
  },

  updateAlreadyPicked (state, data) {
    state.alreadyPicked = data
  }
}

function getRandomInt (state) {
  const size = state.notYetPicked.length
  if (size > 0) {
    return Math.floor(Math.random() * size)
  }
  return null
}

// eslint-disable-next-line no-unused-vars
function getALlLenth (state) {
  return state.notYetPicked.length + state.alreadyPicked.length
}

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
