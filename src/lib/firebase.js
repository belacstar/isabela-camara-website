import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured =
  Boolean(firebaseConfig.apiKey) &&
  Boolean(firebaseConfig.projectId) &&
  Boolean(firebaseConfig.appId)

export const firebaseApp = isFirebaseConfigured
  ? initializeApp(firebaseConfig)
  : null

export const firestore = firebaseApp ? getFirestore(firebaseApp) : null

export const incrementVisitorCount = async () => {
  if (!firestore) {
    return null
  }

  const metricRef = doc(firestore, 'site_metrics', 'visitor_total')

  return runTransaction(firestore, async (transaction) => {
    const snapshot = await transaction.get(metricRef)
    const currentValue = snapshot.exists()
      ? Number(snapshot.data().value || 0)
      : 0
    const nextValue = currentValue + 1

    if (snapshot.exists()) {
      transaction.update(metricRef, {
        value: nextValue,
        updatedAt: serverTimestamp(),
      })
    } else {
      transaction.set(metricRef, {
        value: nextValue,
        updatedAt: serverTimestamp(),
      })
    }

    return nextValue
  })
}
