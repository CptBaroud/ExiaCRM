export default {
  setPicked (state, size) {
    const temp = []
    // Si le nombre de personne est disponible
    if (size <= state.notYetPicked.length) {
      pick(state, size, temp)
      // Si le nombre de personne n'est pas disponible
    } else if (state.notYetPicked.length > 0) {
      console.dir(state.notYetPicked)
      // On recupere les gens pas encore tiré et on les ajoute à ceux etant tirés
      for (let b = 0; b <= state.notYetPicked.length; b++) {
        const user = state.notYetPicked[b]
        console.log('User left : ')
        console.dir(user)
        temp.push(user)
        state.notYetPicked.splice(state.notYetPicked.indexOf(user), 1)
        state.alreadyPicked.push(user)
      }

      // On update le nombre de personne restant a query
      size = size - temp.length
      console.log('Size : ' + size)
      state.notYetPicked = state.alreadyPicked
      state.alreadyPicked = []

      if (size > 0) {
        temp.forEach(function (item) {
          state.notYetPicked.splice(state.notYetPicked.indexOf(item), 1)
          state.alreadyPicked.push(item)
        })
        pick(state, size, temp)
      } else {
        console.log('C bon')
      }
    } else {
      state.notYetPicked = state.alreadyPicked
      state.alreadyPicked = []
      pick(state, size, temp)
    }
    // eslint-disable-next-line no-console
    console.dir(temp)
    state.picked = temp
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
