<script>
import { getAllPrivateChatAdmin } from '../services/private-chat';


export default {
  name: 'PanelChat',
  data() {
    return {
      chats: [], // Inicializa la variable chats como un array vacío.
      admins: []
    };
  },
  async mounted() {
    
    // En el hook created, obtén la lista de chats disponibles y asígnala a la variable chats.
    let allChats = await getAllPrivateChatAdmin();
    console.log(allChats);
    this.chats.push(allChats);
    console.log(allChats);
  },
};
</script>

<template>
<div class="container mx-auto p-4">
    
    <h1>Panel de Mensajes/chats</h1>
    <ul>
      <li v-for="chat in chats" :key="chat.id">
        {{  }} - {{ chat.id }}
      </li>
    </ul>
</div>  
</template>