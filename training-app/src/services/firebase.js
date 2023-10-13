import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB33Hj3XTSOWTo3pgM_b1fpEmYph40kXt0",
  authDomain: "training-app-1fada.firebaseapp.com",
  projectId: "training-app-1fada",
  storageBucket: "training-app-1fada.appspot.com",
  messagingSenderId: "468498791885",
  appId: "1:468498791885:web:17d8930aac6bdfdd229884"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Obtener la Instancia de Firestore
export const db = getFirestore(app);

//autenticación
export const auth = getAuth(app)