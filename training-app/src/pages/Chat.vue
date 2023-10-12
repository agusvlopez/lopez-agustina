<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat";
import { dateToString } from "../helpers/date";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";

export default {
    name: "Chat",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextarea },
    data() {
        return {
            messages: [],
            newMessage: {
                user: '',
                message: ''
            }
        };
    },
    methods: {
        sendMessage() {
            chatSaveMessage({
                user: this.newMessage.user,
                message: this.newMessage.message
                // ...this.newMessage,
            })
                .then(() => {
                this.newMessage.message = '';
            });
        },
        formatDate(data) {
            return dateToString(data);
        }
    },
    mounted() {
        chatSubscribeToMessages(messages => {
            this.messages = messages;
        });
    },
};

</script>

<template> 
    <h1 class="bg-indigo-500 text-white p-3">Chat</h1>

    <div class="container p-2 mx-auto">
        
        <p class="mb-4">¿Dudas o consultas? Chateá con nosotros y podemos ayudarte.</p>

        <div>
            <div v-for="message in messages"
            :key="message.id"
            class="mb-2"
            >
                <div><b>Usuario:</b> {{ message.user }}</div>
                <div><b>Mensaje:</b> {{ message.message }}</div>
                <div class="text-right">{{ formatDate(message.created_at) }}</div>
            </div>
        </div>
    
        <form 
        action="#" 
        @submit.prevent="sendMessage"
        id="form-chat" 
        class="col-8">

            <div class="mt-6">
                <div class="flex space-x-4">
                    <BaseLabel for="user" class="text-sm">Usuario</BaseLabel>
                    <div >
                   
                        <BaseInput 
                        type="text" 
                        id="user"  
                        v-model="newMessage.user"
                        />
                    
                    </div>
                </div>
            </div>
            <div class="mb-2 mt-3">
                <BaseLabel for="message" class="text-sm"></BaseLabel>
                <div class="mt-2 flex">
                    <BaseTextarea
                    id="message" 
                    v-model="newMessage.message"></BaseTextarea> 
                    <BaseButton />
                    </div>
            </div>
           
        </form>

    </div>

</template>