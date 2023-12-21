import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.js';
import { createUserProfile, getUserProfileById, updateUserProfile } from './user.js';
import { getFileURL, uploadFile } from './storage.js';

let userData = {
    id: null,
    email: null,
    rol: null,
    displayName: null,
    photoURL: null,
    trainings: null,
    fullProfileLoaded: false,
}
//definimos la lista de observers
let observers = [];

//Si el usuario figuraba como autenitcado, lo marcamos como tal inmediatamente
if(localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, async user => {
    if(user) {
        setUserData({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }); 
        
        //Busco en firestore
        const fullData = await getUserProfileById(user.uid);
        setUserData({
            rol: fullData.rol,
            trainings: fullData.trainings,
            fullProfileLoaded: true,
        });
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
        console.log(userCredentials);
       //Registro el perfil del usuario tambien en Firestore
       createUserProfile(userCredentials.user.uid, {email});

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
export function login({email, password, rol}) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {

        return {...userData};
    })
    .catch(error => {
        throw error;
    });
}

/**
* @param {{displayName: string|null, photoURL: string|null, trainings: Array|null}} data
* @returns {Promise}
*/
export async function editProfile({displayName, photoURL, trainings}) {
    try {
        const data = {};
        if(displayName !== undefined) data.displayName = displayName;
        if(photoURL !== undefined) data.photoURL = photoURL;

        //Actualizo en Authentication
        const promiseAuth = updateProfile(auth.currentUser, data);

        if(trainings !== undefined) data.trainings = trainings;

        //Actualizo en Firestore
        const promiseProfile = updateUserProfile(userData.id, data);

        await Promise.all([promiseAuth, promiseProfile]);

        //Actualizo los datos de userData y localStorage
        setUserData({
            displayName,
            photoURL,
            trainings
        });
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {File} file 
 * @returns {Promise}
 */
export async function editProfilePhoto(file) {
   const path = `users/${userData.id}/user`;
   await uploadFile(path, file)

   const photoURL = await getFileURL(path);

   return editProfile({
    photoURL
   })
}

/**
 * 
 * @returns {Promise}
 * 
 */
export function logout() {
    
    const promise = signOut(auth);
    
    clearUserData();

    return promise;
}

//observer:

/**
 * Agrega un observer(callback) para ser notificado de los cambios en el estado de autenticación.
 * El observer debe ser una función que reciba como argumento un objeto y no retorne nada
 * 
 * @param {({id: null|string, email: null|string, rol: null|string, displayName: null|string, trainings: null|Array}) => void} observer
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
 * @param {id: null|string, email: null|string, rol: null|string, trainings: null|Array} newData 
 */
function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    localStorage.setItem('user', JSON.stringify(userData));
    notifyAll();
}

/**
 * Limpia todos los datos convirtiendo a null el id y el email
 */
function clearUserData() {
    setUserData({
        id: null,
        email: null,
        rol: null,
        displayName: null,
        photoURL: null,
        trainings: null,
        fullProfileLoaded: false,
    });
    localStorage.removeItem('user');
}

export function getUserId() {
    return userData.id;
}


