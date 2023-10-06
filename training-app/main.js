import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
// import { chatSaveMessage, chatSubscribeToMessages} from "./src/services/chat.js";


const firebaseConfig = {
  apiKey: "AIzaSyB33Hj3XTSOWTo3pgM_b1fpEmYph40kXt0",
  authDomain: "training-app-1fada.firebaseapp.com",
  projectId: "training-app-1fada",
  storageBucket: "training-app-1fada.appspot.com",
  messagingSenderId: "468498791885",
  appId: "1:468498791885:web:17d8930aac6bdfdd229884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Obtener la Instancia de Firestore
const db = getFirestore(app);

const refChat = collection(db, 'chats');

const salida = document.getElementById('salida');
       const formChat = document.getElementById('form-chat');
       const user = document.getElementById('user');
       const message = document.getElementById('message');

       formChat.addEventListener('submit', function(e){
           e.preventDefault();
           const data = {
               user: user.value,
               message: message.value,
           }
       // Grabamos los datos en una collection:
       // solo necesitamos llamar a la funcion addDoc()pasandole 2 cosas: 
       //1. La referencia de la collection donde quiero insertar el documento.
       //2. Un objeto con los datos a insertar
       //La funcion retorna una promesa que se completa cuando el documento se grabo correctamente.


          addDoc(refChat, data)
          .then(() => {
            user.value = '',
            message.value = ''
          })
           
       
       });


       onSnapshot(refChat, snapshot => {
               
               salida.innerHTML = "";   

               salida.innerHTML = snapshot.docs.map(doc => `
                       <div>
                           <div><p><strong>Usuario:</strong> ${doc.data().user}</p></div>
                           <div><p><strong>Dijo:</strong> ${doc.data().message}</p></div>
                       <div>`).join('');
           });    

 // messages = [{user: '', message: ''}]
 chatSubscribeToMessages(messages => {
     salida.innerHTML = messages.map(message => `<div>
         <div><b>Usuario: </b> ${message.user}</div>
          <div><b>Dijo: </b> ${message.message}</div>
      </div>`).join('');
  });