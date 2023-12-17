import {db, storage} from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDocs, doc, deleteDoc, where, updateDoc, getDoc } from "firebase/firestore";
import { deleteFile, getFileURL, uploadFile } from './storage.js';

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

export async function getDocumentId() {
  try {
    const querySnapshot = await getDocs(refTraining);
    querySnapshot.forEach((doc) => {
      // doc.id will give you the ID of each document in the collection
      const documentId = doc.id;
      console.log('Document ID:', documentId);

      return documentId;
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

export async function trainingsEditTraining(trainingId, data) {
  const trainingRef = doc(db, 'trainings', trainingId);
  //const trainingId = trainingRef.id;
  
  return updateDoc(trainingRef, {
    id: trainingId,
    ...data,
    created_at: serverTimestamp(),
  });
}

export async function getTrainings(){
  let getTrainings = await getDocs(refTraining);
  let trainingDocs = getTrainings.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  console.log(trainingDocs);
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

export async function lookForAndDeleteDocument(valor) {
  const collectionName = 'trainings';
  const campo = 'name';
  let deletedDocument;
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(campo, '==', valor));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No se encontraron documentos que coincidan con la búsqueda.');
      return null;
    }

    const documentToDelete = querySnapshot.docs[0];
    console.log(documentToDelete);

    // Obtiene los datos del documento antes de eliminarlo
    const deletedData = documentToDelete.data();

    const documentRef = doc(db, collectionName, documentToDelete.id);

    // Elimina el documento
    await deleteDoc(documentRef);

    // Devuelve los datos del documento eliminado
    deletedDocument = { id: documentToDelete.id, ...deletedData };
  } catch (error) {
    console.error('Error al buscar y eliminar el documento:', error);
  }

  return deletedDocument;
}

export async function getTrainingIds() {
  const querySnapshot = await getDocs(collection(db, 'trainings'));
  const trainingIds = querySnapshot.docs.map(doc => doc.id);

  return trainingIds[0];
}

/**
 * 
 * @param {File} file 
 * @returns {Promise}
 */
export async function editTrainingPhoto(file, id) {
  const path = `trainings/${id}/training`;
  try {
    await uploadFile(path, file);
    const photoURL = await getFileURL(path);
    return photoURL;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error; 
  }
  
}

export async function deleteTrainingPhoto(trainingToDelete){

  try {
    // Construye la ruta del almacenamiento a partir de la URL de la imagen
    const path = `trainings/${trainingToDelete.id}/training`;

    // Elimina la foto del almacenamiento
    const deletedFile = await deleteFile(path);

    return deletedFile;
  } catch(error){
    console.error('Error al eliminar la imagen:', error);
    throw error; 
  }

}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};