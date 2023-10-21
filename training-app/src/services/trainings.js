import {db} from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

  const refTraining = collection(db, 'trainings');
/**
 * Guarda un nuevo mensaje de chat (documento) en la colección trainings con la data correspondiente incluyendo la fecha y hora que se publicó. 
 * @param {{}} data 
 * @returns {Promise}
 */
export function trainingsSaveTraining(data){
  
    return addDoc(refTraining, {
        ...data,
        created_at: serverTimestamp(),
    });
}
