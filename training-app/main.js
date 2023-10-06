// import { chatSaveMessage, chatSubscribeToMessages } from "./src/services/chat.js";

// const salida = document.getElementById('salida');
// const formChat = document.getElementById('form-chat');
// const user = document.getElementById('user');
// const message = document.getElementById('message');

//        formChat.addEventListener('submit', function(e){
//            e.preventDefault();
//            const data = {
//                user: user.value,
//                message: message.value,
//            }

//            chatSaveMessage(data)
//            .then(() => {
//                 user.value = '',
//                 message.value = ''
//            });

       
//        });



//  // messages = [{user: '', message: ''}]
//  chatSubscribeToMessages(messages => {
//      salida.innerHTML = messages.map(message => `<div>
//          <div><b>Usuario: </b> ${message.user}</div>
//           <div><b>Dijo: </b> ${message.message}</div>
//       </div>`).join('');
//   });



//Creamos la app de vue

import { createApp } from "vue";
import App from "./src/App.vue";

const app = createApp(App);

app.mount('#app');