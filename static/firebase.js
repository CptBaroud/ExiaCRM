import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = !firebase.apps.length ? firebase.initializeApp({ projectId: 'exiacrm' }).firestore() : firebase.app().firestore()
