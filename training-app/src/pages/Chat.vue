<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat";
import { dateToString } from "../helpers/date";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import Loader from "../components/Loader.vue";
import { subscribeToAuth } from "../services/auth";
import ChatInput from "../components/ChatInput.vue";

export default {
    name: "Chat",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextarea, Loader, ChatInput },
    data() {
        return {
            messagesLoading: true,
            messages: [],
            newMessageSaving: false,
            newMessage: {
                message: ''
            },
            user: {
                id: null,
                email: null
            },
            unsubscribeAuth: () => {},
            unsubscribeChat: () => {},
        };
    },
    methods: {
        sendMessage() {
            if(this.newMessageSaving) return;

            this.newMessageSaving = true;
            chatSaveMessage({
                userId: this.user.id,
                user: this.user.email,
                message: this.newMessage.message
                // ...this.newMessage,
            })
                .then(() => {
                this.newMessage.message = '';
                this.newMessageSaving = false;
            });
        },
        formatDate(data) {
            return dateToString(data);
        }
    },
    mounted() {
        this.messagesLoading = true;
        this.unsubscribeChat = chatSubscribeToMessages(messages => {
            console.log(this.messages);
            this.messages = messages;
            this.messagesLoading = false;
        });
        this.unsubscribeAuth  = subscribeToAuth(newUser => this.user = {...newUser});
    
    },
    unmounted() {
        this.unsubscribeChat();
        this.unsubscribeAuth();
    }
};

</script>

<template> 
    
    <div class="bg-white rounded-lg shadow-md  max-w-xl mx-auto mt-4">
    <h1 class="bg-indigo-500 text-white p-3 rounded-t-lg mb-2">Chat</h1>
    <div class="p-4">
        <template
        v-if="!messagesLoading">
        <div>
            <div v-for="message in messages"
            :key="message.id"
            class="mb-2"
            >
                <div>
                    <b>Usuario: </b>
                    <router-link 
                    class="transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800" 
                    :to="`/usuario/${message.userId}`"
                    > 
                    {{ message.user }} 
                    </router-link>
                </div>
                <div><b>Mensaje:</b> {{ message.message }}</div>
                <div class="text-right">{{ formatDate(message.created_at) }}</div>
            </div>
        </div>
    </template>
    <template
    v-else>
        <Loader></Loader>
    </template>
        <form 
        action="#" 
        @submit.prevent="sendMessage"
        id="form-chat" 
        class="col-8">

            <div class="mt-6">
                <div class="flex items-center space-x-4">
                    <div class="text-sm font-bold">Usuario: </div>
                    <div class="text-sm">{{ user.email }}</div>
                </div>
            </div>
            <div class="mb-2 mt-3">
                <BaseLabel for="message" class="text-sm"></BaseLabel>
                <div class="mt-2 flex">
                    <ChatInput
                    id="message" 
                    v-model="newMessage.message"
                    class="shadow"
                    ></ChatInput> 
                    <BaseButton class="rounded-full p-3 ml-2"
                    :loading="newMessageSaving"
                    ></BaseButton>
            
                </div>
            </div>
           
        </form>
    </div>
    </div>

</template>