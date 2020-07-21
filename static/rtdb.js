// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const rtdb = !firebase.apps.length ? firebase.initializeApp({
  project_id: 'exiacrm',
  databaseURL: 'https://exiacrm.firebaseio.com'
}).database() : firebase.app().database()
