import {db} from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDocs, doc, deleteDoc, where, updateDoc } from "firebase/firestore";

  const refTraining = collection(db, 'trainings');
  console.log(refTraining);

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
};

export function trainingsEditTraining(trainingId, data){
  const trainingRef = doc(db, 'trainings', trainingId);
  return updateDoc(trainingRef, {
      ...data,
      created_at: serverTimestamp(),
  });
};

export async function getTrainings(){
  let getTrainings = await getDocs(refTraining);
  console.log(getTrainings);
  let trainingDocs = getTrainings.docs;

  return trainingDocs;
}

/**
 * Elimina un documento en una colección de Firebase Firestore.
 * @param {string} collectionName
 * @param {string} documentId 
 * @returns {Promise}
 */
export async function deleteDocument(documentId) {
  const documentRef = doc(db, 'trainings', documentId);
  console.log(documentRef);
  await deleteDoc(documentRef);
}

export async function getTrainingDocs(){
  let trainingDocId;
  let documents = [];
  const querySnapshot = await getDocs(collection(db, 'trainings'));

  querySnapshot.forEach((doc) => {
    const documentData = {
      id: doc.id, 
      ...doc.data(), 
    }; 
    documents.push(documentData);
  });

  trainingDocId = querySnapshot.docs[0];
  return trainingDocId.id;
}

export async function buscarYEliminarDocumento(valor) {
  const collectionName = 'trainings';
  const campo = 'name';
  let deleted;
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(campo, '==', valor));
    const querySnapshot = await getDocs(q);
      
    if (querySnapshot.empty) {
    console.log('No se encontraron documentos que coincidan con la búsqueda.');
    return;
    }
    const documentToDelete = querySnapshot.docs[0];
    console.log(documentToDelete);
    const documentRef = doc(db, collectionName, documentToDelete.id);

    deleted = await deleteDoc(documentRef);

  } catch (error) {
    console.error('Error al buscar y eliminar el documento:', error);
  }

  return deleted;
}

export async function getTrainingIds() {
  const querySnapshot = await getDocs(collection(db, 'trainings'));
  const trainingIds = querySnapshot.docs.map(doc => doc.id);

  return trainingIds[0];
}
