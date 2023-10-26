<script>
import Loader from '../components/Loader.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllPrivateChatAdmin, getPrivateChatDocs, getUserChat, sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { getAllUsers, getUserProfileById } from '../services/user';
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import BaseLabel from '../components/BaseLabel.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { dateToString } from '../helpers/date';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';


export default {
    name: 'PanelChat',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            userLoading: true,
            users: [],
            usersIds: [],
            usersAdmins: [],
            clients: [],
            user: {
                id: null,
                email: null,
                rol: null,
            },
            authUser: {
                id: null,
                email: null,
                rol: null,
            },
            unsubscribeAuth: () => {},
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
            unsubscribeMessages: () => {},
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
        }
    },  
    async mounted() { 
        this.userLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
        this.userLoading = false;
        this.unsubscribeMessages = await subscribeToPrivateChat({
            senderId: this.authUser.id,
            receiverId: this.user.id
        },
        (newMessages) => this.messages = newMessages);
        this.messagesLoading = false;
       
        let user = await getAllUsers();
        let qArray = [];
        let dataArray = [];
        console.log(user);
        //TO DO!!!!!!
        const refUser = collection(db, 'users');
        console.log(refUser);
        const querySnapshot = await getDocs(refUser);
        console.log(querySnapshot);
        querySnapshot.forEach((q) => {
            qArray.push(q.data());
        });
        qArray.forEach((q) => {
            dataArray.push(q);
            console.log(q);
        });
        this.clients = dataArray;
        console.log(this.clients);
        //hacer una condicion para traer todos los chats que intercambien con admin; 
        //despues pasarselo por el parametro de getUserProfileById()
                
        let ids = [];
        const idsDocs = await getAllUsers();
        let array = [];
        let userId = {};

        idsDocs.forEach(async (doc) => {      
            data = doc.data();
            console.log(data.email);
            userId = {
                id: doc.id,
                email: data.email,
                rol: data.rol
            }; 
             console.log(userId);
             ids.push(userId); 
        });

        this.users = ids;


        console.log(this.user);
        this.usersIds = ids;
        console.log(this.idsDocs);

        this.userLoading = true;
      
        this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
        this.userLoading = false;
        this.user = await getUserProfileById(userId);
        
        this.unsubscribeMessages = await subscribeToPrivateChat({
            senderId: this.authUser.id,
            receiverId: this.user.id
        },
        (newMessages) => this.messages = newMessages);
        this.messagesLoading = false;
       console.log(this.authUser.id, this.user.id);
        if(idsDocs){
            idsDocs.forEach((user) => {
            array.push(user.data());
            console.log(array);
           })
           console.log(array);
            this.usersAdmins = array;
            console.log(this.usersAdmins);
        }
        console.log(this.usersAdmins);
       
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
};
</script>

<template>

<section class="container p-4">
        <h1 class="font-bold text-center mb-2">Chat con {{user.email}}</h1>
    
    <div class="bg-white rounded-lg shadow-md max-w-xl mx-auto m-4">
    <Loader v-if="userLoading"></Loader>
    <template v-else>
        <div> 

            <h2 class="bg-indigo-500 text-white p-3 rounded-t-lg mb-4">Conversación con {{user.email}}</h2>

        </div>

        
        <h2 class="sr-only">Mensajes</h2>

    
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
        
    
    </template>
    </div>
    </section>
</template>