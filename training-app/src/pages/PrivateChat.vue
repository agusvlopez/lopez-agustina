<!-- <script>
import { getAllUsers, getUserProfileById } from '../services/user';
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
            users: [],
            usersIds: [],
            usersAdmins: [],
            user: {
                id: 'HZSqZ8YP0OafEltH7j1assYE0AT2',
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
       
        
        let ids = [];
        const idsDocs = await getAllUsers();
        let array = [];

        console.log(idsDocs);
        idsDocs.forEach((doc) => {
            console.log(doc.id);
            ids.push(doc.id);
        })
        this.usersIds = ids;
        console.log(this.idsDocs);
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
   
}
</script> -->
<script setup>
import BaseButton from '../components/BaseButton.vue';
import Loader from '../components/Loader.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { dateToString } from '../helpers/date';
import { useAuth } from '../functions/useAuth';
import { useUserProfile } from '../functions/useUserProfile';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { user: authUser } = useAuth();
const { user, userLoading } = useUserProfile(route.params.id);
const { newMessage, messages, messagesLoading, handleSendMessage } = usePrivateChat(authUser, user);

function usePrivateChat(senderUser, receiverUser) {
    const newMessage = ref({
        message: '',
    });
    const messagesLoading = ref(true);
    const messages = ref([]);
    let unsubscribeMessages = () => {};

    async function handleSendMessage() {
        sendPrivateChatMessage({
            senderId: senderUser.value.id,
            receiverId: receiverUser.value.id,
            message: newMessage.value.message,
        });
        newMessage.value.message = '';
    }

    watch(receiverUser, async newReceiverUser => {
        if(newReceiverUser.id !== null) {
            unsubscribeMessages = await subscribeToPrivateChat(
                {
                    senderId: senderUser.value.id,
                    receiverId: newReceiverUser.id,
                },
                newMessages => messages.value = newMessages
            );
            messagesLoading.value = false;
        }
    });

    onUnmounted(() => unsubscribeMessages());

    return {
        newMessage,
        messages,
        messagesLoading,
        handleSendMessage,
    }
}
console.log(user.email);
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
                    'justify-end': message.senderUser === authUser.id,
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
                    <div class="text-right">{{ dateToString(message.created_at) || "Enviando..." }}</div>
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