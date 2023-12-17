<script setup>
import BaseButton from '../components/BaseButton.vue';
import Loader from '../components/Loader.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { dateToString } from '../helpers/date';
import { useAuth } from '../functions/useAuth';
import { useUserProfile } from '../functions/useUserProfile';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseLabel from '../components/BaseLabel.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseH1 from '../components/BaseH1.vue';
import Loadingcontext from '../components/LoadingContext.vue';

const route = useRoute();
const { user: authUser } = useAuth();
const { user, userLoading } = useUserProfile(route.params.id);
console.log(route.params.id)
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
</script>

<template>
    <Loadingcontext :loading="userLoading">
        <section class="container p-4">    
            <BaseH1>Chat con <router-link :to="`/usuario/${user.id}`" class="text-indigo-600"> {{user.email}} </router-link></BaseH1>
            <div class="bg-white rounded-lg shadow-md max-w-xl mx-auto m-4">
                <div class="bg-indigo-500 flex items-center rounded-t-lg"> 
                    <div class="w-16 mb-4">
                        <img :src="user.photoURL" class="rounded-full mt-3 ml-3">
                    </div>
                    <h2 class="text-white ml-3 p-3">{{user.email}}</h2>
                </div>        
                <h2 class="sr-only">Mensajes</h2>
        
                <!-- Mensajes del chat -->
                <div class="flex flex-col items-start min-h-[400px] p-4 rounded mb-4">
                    <Loadingcontext :loading="messagesLoading">
                        <div 
                        class="max-w-[70%] p-2 rounded mb-2"
                        v-for="message in messages"
                        :key="message.id"
                            :class="{
                                'bg-gray-200': message.senderId !== authUser.id,
                                'text-gray-700': message.senderId !== authUser.id,
                                'bg-indigo-500': message.senderId === authUser.id, 
                                'text-white':  message.senderId === authUser.id,
                                'self-end': message.senderId === authUser.id,
                            }"
                            >
                                {{ message.message }}
                                <div class="text-right">{{ dateToString(message.created_at) || "Enviando..." }}</div>
                        
                        </div>
                    </Loadingcontext>   
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
                            class="shadow border border-gray-300"
                            />
                            <BaseButton class="rounded-full p-3 ml-2"></BaseButton>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </Loadingcontext>
</template>