export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  if (!store.state.auth.loggedIn) {
    if (store.state.auth.user[0].isAdmin) {
      return redirect('/administration')
    }
    return redirect('/')
  }
}
