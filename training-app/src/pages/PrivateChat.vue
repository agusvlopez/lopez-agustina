<script>
import { getUserProfileById } from '../services/user';
import Loader from '../components/Loader.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseButton from '../components/BaseButton.vue';

export default {
    name: 'PrivateChat',
    components: { Loader, ChatInput, BaseLabel, BaseButton },
    data() {
        return {
            userLoading: true,
            user: {
                id: null,
                email: null,
            }
        };
    },
    async mounted() {
        this.userLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoading = false;
    },
   
}
</script>

<template>
    <Loader v-if="userLoading"></Loader>
    <template v-else>
        <h1>Conversación con...</h1>

        <h2 class="sr-only">Mensajes</h2>

    <div class="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto mt-4">
        <!-- Mensajes del chat -->
        <div class="mb-4">
            <!-- Mensaje enviado por el usuario -->
            <div class="flex justify-end mb-2">
                <div class="bg-indigo-500 text-white rounded-lg p-2">
                    Hola, ¿cómo estás?
                </div>
            </div>
            <!-- Mensaje recibido del chat -->
            <div class="flex mb-2">
                <div class="bg-gray-200 rounded-lg p-2">
                    Hola, estoy bien. ¿Y tú?
                </div>
            </div>
            <!-- Puedes agregar más mensajes aquí -->
        </div>
        <!-- Campo de entrada de texto -->
        
            <h2 class="sr-only">Enviar mensaje</h2>
            <form action=""
            @submit.prevent="() => {}"
            >
            <div class="flex items-center">
                <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
                <ChatInput type="text" 
                id="message"
                />
                <BaseButton class="rounded-full p-3 ml-2"></BaseButton>
            </div>
        </form>
        
    </div>
    </template>
</template>