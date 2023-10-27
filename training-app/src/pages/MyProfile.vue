<script>
import { collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { subscribeToAuth } from "../services/auth";
import { getPrivateChatDoc, subscribeToPrivateChat } from '../services/private-chat';
import { getUserProfileById } from "../services/user";
import { db } from "../services/firebase";
import { dateToString } from "../helpers/date";
import Loader from "../components/Loader.vue";
import ChatInput from "../components/ChatInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import CardRadio from "../components/CardRadio.vue";

    export default {
    name: 'MyProfile',
    components: { Loader, ChatInput, BaseButton, BaseLabel, BaseInput, CardRadio },
    data() {
        return {
            userLoading: true,
            rolLoading: true,
            users: [],
            usersIds: [],
            usersAdmins: [],
            newRol: '',
            editRol: false,
            user: {
                id: 'HZSqZ8YP0OafEltH7j1assYE0AT2',
                email: 'admin@admin.com',
                rol: 'admin'
            },
            authUser: {
                id: null,
                email: null,
                rol: null,
            },
            unsubscribeAuth: () => { },
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
            unsubscribeMessages: () => { },
        };
    },
    methods: {
        handleSendMessage() {
            sendPrivateChatMessage({
                senderId: this.authUser.id,
                receiverId: this.user.id,
                message: this.newMessage.message
            });
            this.newMessage.message = '';
        },
        formatDate(data) {
            return dateToString(data);
        },
        async edit() {  
            const documentoRef = doc(db, 'users', this.authUser.id);
            this.authUser.rol = this.newRol;
            this.editRol = false;
            let newRolUser = {rol: this.authUser.rol}

            try {   
                await updateDoc(documentoRef, newRolUser);
                this.rolLoading = false;
                console.log('Documento editado con éxito');
            } catch (error) {
                console.error('Error al editar el documento:', error);
            } 
        },
        editTrue() { 
            this.editRol = true;
        },
        editFalse() {
            this.rolLoading = false;
            this.editRol = false;
        },
    },

    async mounted() {
       
        subscribeToAuth(async (user) => {
            this.rolLoading = true;
            this.authUser = { ...user };
            if (this.user.id) {
                this.registerLoading = true;
            }

            this.userLoading = true;

            this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
            this.userLoading = false;
            this.unsubscribeMessages = await subscribeToPrivateChat({
                senderId: this.authUser.id,
                receiverId: this.user.id
            }, (newMessages) => this.messages = newMessages);
            this.messagesLoading = false;

            let usuarioDocument = await getUserProfileById(this.authUser.id);
            this.authUser.rol = usuarioDocument.rol;
            
            this.rolLoading = false;
        });
       
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
}

</script>

<template>
   <section class="container p-4">
       <Loader v-if="userLoading"></Loader>
       <template v-else>
        <h1 class="font-bold text-center">Mi perfil</h1>
        <div class="flex gap-3 justify-between p-3">

        <section>
        <h2 class="text-xl font-bolder">Administrar mis datos</h2>
       
        <div class="max-w-md overflow-hidden shadow-lg bg-white mt-4 rounded-md">
        <div class="px-6 py-4 flex">
            <div class="userIcon mr-4">
                <img src="../imgs/user.png" alt="Icono de usuario" class="w-full">
            </div>
            <div>
            <p class="text-lg mb-2"><span class="font-bold">Email:</span> {{ authUser.email }}</p>
            <template v-if="!rolLoading">
                <p class="text-lg" ><span class="font-bold">Rol:</span> {{ authUser.rol }}</p>
            </template>
           
            <template v-else>
                <Loader></Loader>
            </template>
          
            <div class="flex justify-end align-middle">
                <button @click="editTrue" class="font-bold text-indigo-500 flex items-center"> Editar rol <span class="editIcon block ml-1"></span></button>
            </div>
            </div>
        </div>
        <div class="p-2" v-if="editRol">
            <form 
                    action="#"
                    @submit.prevent="edit"
                    >
                    <div class="bg-gray-200 max-w-fit mt-2 mb-6 p-3 rounded-md shadow-sm mx-auto">
                        <div class="flex justify-end font-bold">
                            <button @click="editFalse"><p class="closeButton"></p></button>
                        </div>
                    <p class="mb-3 font-semibold">Elegí tu nuevo rol:</p>
                        <div class="flex gap-1 mb-8">
                            <label v-if="authUser.rol == 'cliente'"  class="cursor-pointer" for="admin">
                                <input type="radio" class="peer sr-only" id="admin" value="admin" v-model="newRol" />
                                <CardRadio class="text-sm mr-1">Administrador/a</CardRadio>
                            </label>
                            <label v-if="authUser.rol == 'admin'" class="cursor-pointer" for="cliente">
                                <input type="radio" class="peer sr-only" id="cliente" value="cliente" v-model="newRol" />
                                <CardRadio class="text-sm">Cliente</CardRadio>
                            </label>
                            <BaseButton
                            class="text-sm"
                            >Editar</BaseButton>
                        </div>
                    </div>
                    </form>
        </div>
        </div>
        </section>

        <section v-if="authUser.rol == 'cliente'">
        <h2 class="text-xl font-bolder">Mis mensajes</h2>
        <p class="mt-2 font-bold text-indigo-600 hover:text-indigo-700"> <router-link to="/usuario/HZSqZ8YP0OafEltH7j1assYE0AT2/chat">Ir a la conversación »</router-link> </p>
        <div class="bg-white rounded-lg shadow-md max-w-sm mx-auto m-4">
           <div> 
               <h2 class="bg-indigo-500 text-white p-3 rounded-t-lg mb-4">Conversación con {{user.email}}</h2>
   
           </div>
         
           <!-- Mensajes del chat -->
           <div class="mb-6 p-4">
               <Loader v-if="messagesLoading"></Loader>
               <template v-else>
               <div 
               class="flex mb-2"
               v-for="message in messages"
               :key="message.id"
               :class="{
                       'justify-end': message.senderId === authUser.id,
                   }"
               >
                   <div 
                   class= "rounded-lg p-2"
                   :class="{
                       'bg-gray-200': message.senderId !== authUser.id,
                       'text-gray-700': message.senderId !== authUser.id,
                       'bg-indigo-500': message.senderId === authUser.id, 
                       'text-white':  message.senderId === authUser.id,
                   }"
                   >
                       {{ message.message }}
                       <div class="text-right">{{ formatDate(message.created_at) || "Enviando..." }}</div>
                   </div>
               </div>
               </template>
           
           </div>
           <!-- Campo de entrada de texto -->
           
               <h2 class="sr-only">Enviar mensaje</h2>
               <form action=""
               @submit.prevent="handleSendMessage"
               class="col-8"
               >
               <div class="mb-2 mt-3 p-4">
                   <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
                   <div class="flex items-center mt-2">
                       <ChatInput type="text" 
                       id="message"
                       v-model="newMessage.message"
                       class="shadow"
                       />
                       <BaseButton class="rounded-full p-3 ml-2"></BaseButton>
                   </div>
               </div>
           </form>
           
       </div>
        </section>
    </div>
       </template>
    </section>  
</template>