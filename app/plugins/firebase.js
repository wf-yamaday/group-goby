import firebase from 'firebase'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID
  })
}

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
export { db }
