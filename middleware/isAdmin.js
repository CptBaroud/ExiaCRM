export default function ({ store, redirect }) {
  const isAuthenticated = !!store.state.auth.user

  if (isAuthenticated) {
    if (store.state.auth.user[0].isAdmin) {
      return redirect('/administration')
    } else {
      return redirect('/chat')
    }
  }
  return redirect('/')
}
