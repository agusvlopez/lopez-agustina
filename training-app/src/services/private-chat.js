import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";


//cache
const privateChatCache = {};


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
        debugger;
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

async function getPrivateChatDoc({senderId, receiverId}){
    
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

//No me sale...
/**
* Obtiene la referencia del mensaje
*/
// async function getMessageRef({senderId, receiverId}){

//     let privateChatDoc = await getPrivateChatDoc({senderId,receiverId});
    
//     //Creo la referencia a la collection de messages.
//     let messagesRef = collection(db, `private-chats/${privateChatDoc.id}/messages`);
    
//     return messagesRef;
// }

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