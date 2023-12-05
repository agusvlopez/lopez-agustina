import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';

//Manejar los perfiles de usuario

/**
 * @param {string} id
 * @returns {Promise<{id: string, email: string, rol: string}>}
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