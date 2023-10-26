<script>
import Loader from '../components/Loader.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllPrivateChatAdmin, getPrivateChatDocs, getUserChat, subscribeToPrivateChat } from '../services/private-chat';
import { getUserProfileById } from '../services/user';
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import BaseLabel from '../components/BaseLabel.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseButton from '../components/BaseButton.vue';


export default {
    name: 'PanelChat',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            chats: [],
            admins: [],
            userId: null,
            user: {
                id: null,
                email: null,
                rol: null
            },
            authUser: {
                id: null,
                email: null,
                rol: null,
            },
            receiverId: null,
            userLoading: true,
            users: [],
            usersIds: [],
            unsubscribeMessages: () => { },
            unsubscribeAuth: () => { },
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
        };
    },
    async mounted() {
        subscribeToAuth(async (user) => {
            this.user = { ...user };
            if (this.user.id) {
                console.log(this.user.id);
            }
            let result = await getUserProfileById(this.user.id);
            let chatDoc;
            //  this.user.rol = result.rol;
            let chatsDocs = [];
            if (result) {
                this.admins.push(result);
            }
            console.log(result);
            this.unsubscribeMessages = await subscribeToPrivateChat({
                senderId: result.id,
                receiverId: this.user.id
            }, (newMessages) => this.messages = newMessages);
            this.messagesLoading = false;
            this.userLoading = false;
        });
        // En el hook created, obtén la lista de chats disponibles y asígnala a la variable chats.
        // console.log(allChats);
        // this.chats.push(allChats);
    },
    unmounted() {
        // this.unsubscribeAuth();
        this.unsubscribeMessages();
    },
};
</script>

<template>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="bg-white p-4 rounded-lg shadow">
      <img src="avatar1.jpg" alt="Usuario 1" class="mx-auto w-20 h-20 rounded-full">
      <h3 class="text-xl font-semibold mt-4">Usuario 1</h3>
      <p class="text-gray-600">Estado: Activo</p>
      <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">Enviar Mensaje</button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
      <img src="avatar2.jpg" alt="Usuario 2" class="mx-auto w-20 h-20 rounded-full">
      <h3 class="text-xl font-semibold mt-4">Usuario 2</h3>
      <p class="text-gray-600">Estado: Ausente</p>
      <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">Enviar Mensaje</button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
      <img src="avatar3.jpg" alt="Usuario 3" class="mx-auto w-20 h-20 rounded-full">
      <h3 class="text-xl font-semibold mt-4">Usuario 3</h3>
      <p class="text-gray-600">Estado: Desconectado</p>
      <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">Enviar Mensaje</button>
    </div>
    <!-- Agrega más perfiles de usuarios según sea necesario -->
  </div>
</template>