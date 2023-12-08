import {db} from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const refChat = collection(db, 'chats');

/**
 * Guarda un nuevo mensaje de chat (documento) en la colección chats con la data correspondiente incluyendo la fecha y hora que se publicó. 
 * @param {{}} data 
 * @returns {Promise}
 */
export function chatSaveMessage(data){
    return addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    });
}

/**
 * 
 * @param {() =>{}} callback 
 * @returns {import('firebase/auth').Unsubscribe}
 */
export function chatSubscribeToMessages(callback) {

    const q = query(refChat, orderBy('created_at'));

    return onSnapshot(q, snapshot => {
    //Transformamos el snapshot a un array de objetos que tengan solo los datos de cada mensaje
        const data = snapshot.docs.map(doc => {
            
         return {
            id: doc.id,
            userId: doc.data().userId,
            user: doc.data().user,
            message: doc.data().message,
            created_at: doc.data().created_at?.toDate(),
         }    
        });

        callback(data);
    });    
}