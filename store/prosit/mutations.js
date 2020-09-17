export default {
  fillKeywords (state, data) {
    console.dir(data)
    state.keywords = data
  },
  fillContext (state, data) {
    state.context = data
  },
  fillConstraints (state, data) {
    state.constraints = data
  },
  filGeneralisation (state, data) {
    state.generalisation = data
  },
  fillProblematics (state, data) {
    state.problematics = data
  },
  fillhypothesises (state, data) {
    state.hypothesises = data
  },
  fillPa (state, data) {
    state.pa = data
  },
  fillSummary (state, data) {
    state.summary = data
  },
  fillLastPa (state, data) {
    state.lastPa = data[0]
  },
  fillAllPa (state, data) {
    console.dir(data)
    state.allPa = data
  },
  addCer (state, data) {
    state.cer = { name: data.name, data }
  },
  editKeyword (state, data) {
    state.keywords.splice(state.keywords.indexOf(data.id), 1)
    state.keywords.push(data)
  }
}
