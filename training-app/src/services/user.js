import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from './firebase';

//Manejar los perfiles de usuario

/**
 * @param {string} id
 * @returns {Promise<{id: string, email: string, rol: string}>}
 */
export async function getUserProfileById(id){

    //Busco el documento
    const refUser = doc(db, `users/${id}`);
    const docSnapshot = await getDoc(refUser);

    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        rol: docSnapshot.data().rol,
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
            query(refUser,
            where('rol', '==', 'admin')),
            //cuando encuentra un documento con esos valores deje de buscar:

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