<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import BaseButton from '../components/BaseButton.vue';

const emit = defineEmits(['closeAlert']);
const props = defineProps(['title', 'message', 'submitAction']);

const isLoading = ref(false);
const isSuccess = ref(false);
function closeAlert() {
  emit('closeAlert');
}

async function sendAction() {
  isLoading.value = true;

  try {
    if (props.submitAction) {
      await props.submitAction();
      isSuccess.value = true;
    }
  } catch (error) {
    console.error('Error al ejecutar la acción:', error);
  } finally {
    isLoading.value = false;
    closeAlert();
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div class="bg-white p-8 shadow-lg rounded-lg max-w-md border-2">
      <span class="font-bold text-lg block">{{ title }}</span>
      <p class="block sm:inline">{{ message }}</p>
      <form action="#" @submit.prevent="sendAction">
        <div class="flex gap-4 justify-between mt-6">
          <BaseButton
            @click="closeAlert"
            :disabled="isLoading"
            class="bg-gray-500 hover:bg-gray-400"
          >Cancelar</BaseButton>
          <BaseButton 
            :loading="isLoading"
            :disabled="isSuccess || isLoading"
          >Aceptar</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>