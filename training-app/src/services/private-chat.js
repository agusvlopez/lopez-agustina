import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

//cache
const privateChatCache = {};
const refChat = collection(db, 'private-chats');
/**
* 
* @param {senderId: string, receiverId: string, message: string} data
* @returns {Promise} 
*/
export async function sendPrivateChatMessage({senderId, receiverId, message}) {
    
    const privateChatDoc = await getPrivateChatDoc({senderId,receiverId});
    
    //Creo la referencia a la collection de messages.
    const messagesRef = collection(db, `private-chats/${privateChatDoc.id}/messages`);

    await addDoc(messagesRef,{
        senderId,
        message,
        created_at: serverTimestamp(),
    });

    return true;

}

/**
 * 
 * @param {senderId: string, receiverId:string} users 
 * @param {(){}[] => void} callback 
 * @returns {Promise<import("firebase/auth").Unsubscribe>}
 */
export async function subscribeToPrivateChat({senderId, receiverId}, callback){

    const privateChatDoc = await getPrivateChatDoc({senderId,receiverId});
    
    //Creo la referencia a la collection de messages.
    const messagesRef = collection(db, `private-chats/${privateChatDoc.id}/messages`);

    const q = query(
        messagesRef,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                senderId: doc.data().senderId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(messages);
    })
}

export async function getPrivateChatDoc({senderId, receiverId}){
    
    const cacheRef = getOfCache({senderId,receiverId});

    if(cacheRef){
        console.log("el cache es: ", cacheRef);
        return cacheRef;
    }

    console.log("Busco el documento");
    const privateChatRef = collection(db, 'private-chats');
    let privateChatDoc;

    const snapshot = await getDocs( 
        query(privateChatRef,
        where('users', '==', {
            [senderId]: true,
            [receiverId]: true,
        }),
        //cuando encuentra un documento con esos valores deje de buscar:
        limit(1),
     ));

    if(snapshot.empty){
        //Creo el documento para el chat privado
        privateChatDoc = await addDoc(privateChatRef, {
        users: {
             [senderId]: true,
             [receiverId]: true,
         }
     });
    }else{
        privateChatDoc = snapshot.docs[0];

    }
    addToCache({senderId, receiverId}, privateChatDoc);
     return privateChatDoc;
}

/**
 * 
 * Agrega al objeto global privateChatCache el valor que quiera guardar.
 * 
 * @param {{senderId: string, receiverId: string}} users
 * @param {{}} value 
 * @returns {{}}
 */
function addToCache({senderId, receiverId}, value){
    const key = getKeyForCache({senderId, receiverId});
    privateChatCache[key] = value;
}

/**
 * 
 * Obtiene los datos del cache y los devuelve. Si no hay nada retorna null.
 * 
 * @param {{senderId: string, receiverId: string}} users 
 * @returns {{}||null}
 */
function getOfCache({senderId, receiverId}){
    const key = getKeyForCache({senderId, receiverId});
    return privateChatCache[key] || null;
}

/**
 * Devuelve la key unica generada para el caché.
 */
function getKeyForCache({senderId,receiverId}){
    return senderId + receiverId;
}

export async function getUserChat({senderId, receiverId}) {

    const cacheRef = getOfCache({senderId,receiverId});

    if(cacheRef){
        console.log("el cache es: ", cacheRef);
        return cacheRef;
    }

    console.log("Busco el documento");
    const privateChatRef = collection(db, 'private-chats');
    let privateChatDoc;

    const snapshot = await getDocs( 
        query(privateChatRef,
        where('users', '==', {
            [senderId]: true,
            [receiverId]: true,
        }),
        //cuando encuentra un documento con esos valores deje de buscar:
        limit(1),
     ));
        
     privateChatDoc = snapshot.docs[0];

   
    addToCache({senderId, receiverId}, privateChatDoc);
     return privateChatDoc;
  }

export async function getAllPrivateChatAdmin(){
    
    let privateChatDoc;
    console.log("Busco el documento");
    // const privateChatAdmin = collection(db, 'private-chats');
    // const querySnapshot = await getDocs(collection(db, 'private-chats'));
    await getDocs(refChat);
    let chatsDocs = querySnapshot.docs;
    console.log(chatsDocs);

    return chatsDocs;
}

export async function getPrivateChatDocs(idUser){
    const privateChatRef = collection(db, 'private-chats');
    let privateChatDoc;
    let privateChatDocId;
    
    
    const snapshot = await getDocs( 
        query(privateChatRef,
        where(`${idUser}`, '==', true),
        //cuando encuentra un documento con esos valores deje de buscar:
       limit(1),
     ));
            console.log(snapshot);

    console.log(snapshot);
     let documents = [];
     snapshot.forEach((doc) => {
         // Aquí puedes acceder a los datos de cada documento.
         // Por ejemplo, doc.data() te proporcionará los datos del documento.
         // Puedes ajustar esta parte según tu estructura de datos real.
             const documentData = {
                 id: doc.id, // ID del documento
                 ...doc.data(), // Datos del documento
             };
    
             documents.push(documentData);
         });
//         // const snapshot = await getDocs( 
//         //     query(privateChatAdmin,
//         //     where('users', '==', {
//         //         [adminId]: true,
//         //         [receiverId]: true,
//         //     }),
//         //     //cuando encuentra un documento con esos valores deje de buscar:
//         //     limit(1),
//         //  ));
     
        privateChatDocId = snapshot.docs[0];
        console.log(privateChatDocId);
        return privateChatDocId;
}