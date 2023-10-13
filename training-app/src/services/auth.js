import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

let userData = {
    id: null,
    email: null,
}
//definimos la lista de observers
let observers = [];

/**
* Iniciar sesión
*
* @param {{email: string, password: string}} user 
* @return {Promise}
*/
export function login({email, password}){
    return signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {

        setUserData({
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
        });

        return {...userData};
    })
    .catch(error => {
        return {
            code: error.code,
            message: error.message,
        }
    });

}

/**
 * 
 * @returns {Promise}
 * 
 */
export function logout(){
    
    const promise = signOut(auth);
    
    clearUserData();

    return promise;
}

//observer:

/**
 * Agrega un observer(callback) para ser notificado de los cambios en el estado de autenticación.
 * El observer debe ser una función que reciba como argumento un objeto y no retorne nada
 * 
 * @param {({id: null|string, email: null|string}) => void} observer
 */
export function subscribeToAuth(observer){

    //agrego el observer a la lista de observers
    observers.push(observer);

    //Ejecutamos el observer inmediatamente con la data actual
    notify(observer);
}

/**
 * Notifica a todos los observers de los datos de la autenticación
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}

/**
 * Notifica a un observador de los datos
 * 
 * @param {() =>{}} observer 
 */
function notify(observer){
    //ejecuta el observer y le pasa la data
    observer({...userData});
}


/**
 * 
 * @param {id: null|string, email: null|string} newData 
 */
function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    notifyAll();
}

/**
 * Limpia todos los datos convirtiendo a null el id y el email
 */
function clearUserData() {
    setUserData({
        id: null,
        email: null,
    });
}
