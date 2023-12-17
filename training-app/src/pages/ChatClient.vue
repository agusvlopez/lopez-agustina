<script setup>
import BaseButton from '../components/BaseButton.vue';
import LoadingContext from '../components/LoadingContext.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { dateToString } from '../helpers/date';
import { useAuth } from '../functions/useAuth';
import { useUserProfile } from '../functions/useUserProfile';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Baseh1 from '../components/BaseH1.vue';

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

  watch(receiverUser, async (newReceiverUser) => {
    if (newReceiverUser.id !== null) {
      unsubscribeMessages = await subscribeToPrivateChat(
        {
          senderId: senderUser.value.id,
          receiverId: newReceiverUser.id,
        },
        newMessages => (messages.value = newMessages)
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
  };
}
</script>

<template>
  <LoadingContext :loading="userLoading">
    <section class="container p-4">
      <Baseh1>Chat con {{user.email}}</Baseh1>  
      <div class="bg-white rounded-lg shadow-md max-w-xl mx-auto m-4">
          <div> 
              <h2 class="bg-indigo-500 text-white p-3 rounded-t-lg mb-4">Conversación con {{user.email}}</h2>
          </div>    
          <h3 class="sr-only">Mensajes</h3>
          <!-- Mensajes del chat -->
          <div class="mb-6 p-4">
            <LoadingContext :loading="messagesLoading">
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
                          <div class="text-right">{{ dateToString(message.created_at) || "Enviando..." }}</div>
                      </div>
                  </div>
            </LoadingContext>    
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
  </LoadingContext>
</template>