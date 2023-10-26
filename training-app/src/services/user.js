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

export async function editUserProfile(id, newRol) {
    // Define la referencia al documento que deseas editar
    const documentoRef = doc(db, `users/${id}`); // Reemplaza 'nombre_de-tu-colección' y 'id_del_documento' con los valores correctos

    // Define los nuevos datos que deseas asignar a campos específicos del documento
    const newData = {   
            rol: newRol,
         };
                
        // Realiza la actualización del documento utilizando updateDoc()
       
                
        // Llama a la función para editar el documento
        editDocument(newData.rol);
}

export async function editDocument(newRol) {
        try {
            await updateDoc(documentoRef, newRol);
            console.log('Documento editado con éxito');
        } catch (error) {
            console.error('Error al editar el documento:', error);
        }
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