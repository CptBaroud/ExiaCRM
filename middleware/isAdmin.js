export default function ({ store, redirect }) {
  const isAuthenticated = !!store.state.auth.user

  if (isAuthenticated) {
    if (!store.state.auth.user.role >= 2) {
      return redirect('/')
    }
  }
}
