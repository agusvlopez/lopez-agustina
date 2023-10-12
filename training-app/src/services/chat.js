import {db} from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatSaveMessage(data){
    return addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    });
}

export function chatSubscribeToMessages(callback) {

    const q = query(refChat, orderBy('created_at'));

    onSnapshot(q, snapshot => {
    //Transformamos el snapshot a un array de objetos que tengan solo los datos de cada mensaje
        const data = snapshot.docs.map(doc => {
            
         return {
            id: doc.id,
            user: doc.data().user,
            message: doc.data().message,
            created_at: doc.data().created_at.toDate(),
         }
         
        });

        callback(data);
    });    
}