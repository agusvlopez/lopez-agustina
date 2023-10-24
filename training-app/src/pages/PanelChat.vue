<script>
import { subscribeToAuth } from '../services/auth';
import { getAllPrivateChatAdmin, getUserChat } from '../services/private-chat';
import { getUserProfileById } from '../services/user';


export default {
  name: 'PanelChat',
  data() {
    return {
      chats: [], // Inicializa la variable chats como un array vacío.
      admins: [],
      userId: null,
      user: {
                id: null,
                email: null,
                rol: null
            },
          receiverId: null,
    };
  },
  async mounted() {
    subscribeToAuth( async user => {
     
     this.user = {...user};
     if(this.user.id) {
          console.log(this.user.id);
     }

     let result = await getUserProfileById(this.user.id);
     this.user.rol = result.rol;
     console.log(result.id);

     let allChats = await getUserChat(this.user.id);
     console.log(allChats);
     let chatDoc;
        // allChats.forEach(doc => {
        // chatDoc = doc.data();
        // this.chats.push(chatDoc);
        // console.log(this.chats);
        // });
        
        // console.log(this.chatDoc);
        // return this.chatDoc;
  });
    // En el hook created, obtén la lista de chats disponibles y asígnala a la variable chats.
    
    // console.log(allChats);
    // this.chats.push(allChats);

        
  },
};
</script>

<template>
<div class="container mx-auto p-4">
    
  <h1>Panel de Mensajes/chats</h1>
  <div v-for="chat in chats" :key="chat.id">
    <ul>
      <li>
        {{  }} - {{ chat.id }}
      </li>
    </ul>
  </div>
</div>  
</template>