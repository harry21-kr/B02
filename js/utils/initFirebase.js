import { firebaseConfig } from "../config/firebase.js";
import { getFirestore, initializeApp } from "../imports.js";

// Firebase의 인스턴스 초기화하고, db를 return
export function initFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return db;
}
