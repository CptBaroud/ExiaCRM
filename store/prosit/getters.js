export default {
  /**
   * Probablemenent deprecated
   * TODO : check usages
   * @param state
   * @returns {[]}
   */
  pa (state) {
    const out = []
    state.pa.forEach(function (item) {
      out.push(item.name)
    })
    return out
  },

  cer (state) {
    return state.cer
  },

  /**
   * Permet de stocker un Plan d'action (Summary)
   * Dans le store correspondant
   * @param state
   * @returns {[]}
   */
  summary (state) {
    const out = []
    state.summary.forEach(function (item) {
      out.push(item.name)
    })
    return out
  },

  allPa (state) {
    return state.allPa
  },

  keywords (state) {
    return state.keywords
  },

  lastPa (state) {
    return state.lastPa
  }
}
