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
    <h1 class="text-2xl bg-gray-900 text-white p-3">Chat</h1>

    <div class="container p-3">
        
        <p class="mb-4">¿Dudas o consultas? Chateá con nosotros y podemos ayudarte.</p>

        <div>
            <div v-for="message in messages">
                <div><b>Usuario:</b> {{ message.user }}</div>
                <div><b>Mensaje:</b> {{ message.message }}</div>
            </div>
        </div>
    
        <form 
        action="#" 
        @submit.prevent="sendMessage"
        id="form-chat" 
        class="col-8">
        
            <div class="mt-6">
                <div class="flex space-x-4">
                    <label for="user" class="text-sm block font-bold">Usuario</label>
                    <div >
                   
                        <input 
                        type="text" 
                        id="user" 
                        class="mb-3 border-b-2 border-gray-500 px-3 focus:outline-none focus:border-indigo-600 flex-grow" 
                        v-model="newMessage.user"
                        >
                    
                    </div>
                </div>
            </div>
            <div class="mb-3 mt-3">
                <label for="message"></label>
                <div class="mt-2 flex">
                    <textarea 
                    id="message" 
                    rows="1" 
                    class="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" placeholder="Escribe tu mensaje..."
                    v-model="newMessage.message"></textarea> 
                    <button type="submit" class="bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-600 focus:outline-none">Enviar</button>
                </div>
            </div>
           
        </form>

    </div>

</template>