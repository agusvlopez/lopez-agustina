import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

let userData = {
    id: null,
    email: null,
}
//definimos la lista de observers
let observers = [];

//Si el usuario figuraba como autenitcado, lo marcamos como tal inmediatamente
if(localStorage.getItem('user')){
    userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, user => {
    if(user) {
        setUserData({
            id: user.uid,
            email: user.email,
        });
        localStorage.setItem('user', JSON.stringify(userData));

        }else {
            clearUserData();
            localStorage.removeItem('user');
        }
    
});

/**
* @param {{email: string, password: string}} user 
* @return {Promise}
 */
export async function register({email, password}) {
    try {
       const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
        }  
    } catch (error) {
        return {
            code: error.code,
            message: error.message,
        }
    }
   
}

/**
* Iniciar sesión
*
* @param {{email: string, password: string}} user 
* @return {Promise}
*/
export function login({email, password}){
    return signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {

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
 * @return {() => void} Función para cancelar la suscripción
 */
export function subscribeToAuth(observer){
   
    //agrego el observer a la lista de observers
    observers.push(observer);
 console.log("cantidad de observers: ", observers.length);
    //Ejecutamos el observer inmediatamente con la data actual
    notify(observer);

    return () => {
        observers = observers.filter(obs => obs !== observer);
        console.log("cantidad de observers removidos: ", observers.length);
    }
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
    //siempre pasamos una copia del objeto
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
