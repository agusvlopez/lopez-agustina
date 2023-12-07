import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';

//Manejar los perfiles de usuario

/**
 * @param {string} id
 * @returns {Promise<{id: string, email: string, rol: string, displayName: string|null, photoURL: string|null, trainings: Array|null}>}
 */
export async function getUserProfileById(id){

    //Busco el documento
    const refUser = doc(db, `users/${id}`);
    console.log(refUser);
    const docSnapshot = await getDoc(refUser);
    console.log(docSnapshot);
    return {
        id: docSnapshot.id,
        ...docSnapshot.data()
    }
}

/**
 * 
 * @param {string} id 
 * @param {{email:string, rol: string}} data
 * @returns {Promise} 
 */
export async function createUserProfile(id, data) {
    //Pido la referencia
    const refUser = doc(db, `users/${id}`);
    //setDoc me permite escribir un documento especifico
    return setDoc(refUser,{...data, created_at:serverTimestamp()});
}


export async function getAllUsers(){
    const refUser = collection(db, 'users');

    try {
        // const querySnapshot = await getDocs(refUser);
        const querySnapshot = await getDocs( 
            query(refUser)
         );
         if(querySnapshot){
            console.log(querySnapshot);
            const datosSubcoleccion = [];
            let documents = [];
        querySnapshot.forEach((doc) => {
          datosSubcoleccion.push(doc.data());
          console.log(doc);
          documents.push(doc);
        });
        console.log(datosSubcoleccion);
        console.log(documents);
        return documents;
        }
            
    } catch (error) {
        console.error('Error al obtener datos de la subcolección:', error);
    }
}

/**
 * 
 * @param {string} id 
 * @param {{displayName: string|null, photoURL: string|null, trainings: Array|null}} data
 * @returns {Promise} 
 */
export async function updateUserProfile(id, data) {
    return updateDoc(
        doc(db, `users/${id}`),
        {...data}
    )
}

/**
 * Agrega un documento a la subcolección "trainings" dentro de la colección "users".
 * @param {string} userId - ID del usuario al que se le añadirá el entrenamiento.
 * @param {Object} trainingData - Datos del entrenamiento a añadir.
 * @returns {Promise}
 */
export async function addTrainingToUser(userId, trainingData) {
    try {
      // Verifica si el usuario ya tiene el entrenamiento
      const userRef = doc(db, 'users', userId);
      const userTrainingsRef = collection(userRef, 'trainings');
  
      // Añade el entrenamiento a la subcolección "trainings" del usuario
      const newTrainingRef = await addDoc(userTrainingsRef, trainingData);
  
      // Obtiene el ID del nuevo entrenamiento
      const trainingId = newTrainingRef.id;
  
      // Actualiza el documento con el ID del entrenamiento
      await setDoc(newTrainingRef, { id: trainingId }, { merge: true });
  
      console.log('Entrenamiento añadido con éxito al usuario.');
    } catch (error) {
      console.error('Error al añadir el entrenamiento al usuario:', error);
      throw error;
    }
  }