import {db} from './firebase.js';
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatSaveMessage(data){
    return addDoc(refChat, data);
}

export function chatSubscribeToMessages(callback) {
    
    onSnapshot(refChat, snapshot => {
  //Transformamos el snapshot a un array de objetos que tengan solo los datos de cada mensaje
        const data = snapshot.docs.map(doc => {
            
         return {
            user: doc.data().user,
            message: doc.data().message
         }
         
        });

        callback(data);
    });    
}