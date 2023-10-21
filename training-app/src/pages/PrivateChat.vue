<script>
import { getUserProfileById } from '../services/user';
import { dateToString } from '../helpers/date';
import Loader from '../components/Loader.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseButton from '../components/BaseButton.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { subscribeToAuth } from '../services/auth';


export default {
    name: 'PrivateChat',
    components: { Loader, ChatInput, BaseLabel, BaseButton, Loader },
    data() {
        return {
            userLoading: true,
            user: {
                id: null,
                email: null,
            },
            authUser: {
                id: null,
                email: null,
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
       
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
   
}
</script>

<template>
 <div class="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto mt-4">
    <Loader v-if="userLoading"></Loader>
    <template v-else>
       
        <h1 class="mb-4">Conversación con {{ this.user.email }}</h1>

        <h2 class="sr-only">Mensajes</h2>

    
        <!-- Mensajes del chat -->
        <div class="mb-6">
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
            >
            <div class="flex items-center">
                <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
                <ChatInput type="text" 
                id="message"
                v-model="newMessage.message"
                />
                <BaseButton class="rounded-full p-3 ml-2"></BaseButton>
            </div>
        </form>
        
    
    </template>
    </div>
</template>