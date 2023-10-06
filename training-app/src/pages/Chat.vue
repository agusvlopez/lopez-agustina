<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat";

export default {
    name: "Chat",
    data() {
        return {
            messages: [],
            newMessage: {
                user: '',
                message: ''
            }
        }
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

    <div class="container">
        <h1 class="m-2">Chat</h1>
        <p>Leyendo los mensajes del chat en tiempo real</p>
    
        <form 
        action="#" 
        @submit.prevent="sendMessage"
        id="form-chat" 
        class="col-8">
            <div class="mb-3">
                <label for="user" class="form-label">Usuario</label>
                <input 
                type="text" 
                id="user" 
                class="form-control"
                v-model="newMessage.user"
                >
            </div>
    
            <div class="mb-3">
                <label for="message" class="form-label">Mensaje</label>
                <textarea 
                id="message" 
                cols="30" rows="6" 
                class="form-control"
                v-model="newMessage.message"></textarea>
            </div>
            <button type="submit" class="btn btn-primary mb-3">Enviar</button>
        </form>
    
        <div>
            <div v-for="message in messages">
                <div><b>Usuario: {{ message.user }}</b></div>
                <div><b>Mensaje: {{ message.message }}</b></div>
            </div>
        </div>

    </div>

</template>