export default {
  setUsers (state, data) {
    state.users = data
  },

  setDropdownUsers (state, data) {
    let temp = []
    temp = []
    data.forEach(function (item) {
      temp.push({
        text: item.name,
        value: item._id
      })
    })

    state.userDropdown = temp
  },

  edit (state, data) {
    const index = state.userDropdown.findIndex((item) => {
      return item.value === data
    })

    state.users[index] = data
  },

  updateUserDisable (state, data) {
    const index = state.userDropdown.findIndex((item) => {
      return item.value === data
    })
    state.userDropdown[index].disabled = !state.userDropdown[index].disabled
  }
}
