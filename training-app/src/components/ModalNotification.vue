<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import CancelButton from './CancelButton.vue';

const emit = defineEmits(['closeAlert']);
const props = defineProps(['title', 'message', 'price', 'callToActionMessage', 'submitAction']);

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
      <span class="font-bold text-lg block">Estás a punto de contratar el entrenamiento: <span>{{ title }}</span></span>
      <p class="font-semibold">Precio total: ${{ price }}</p>
      <p class="block font-semibold sm:inline">{{ message }}</p>
      <form action="#" @submit.prevent="sendAction">
        <div class="flex gap-4 justify-between mt-6">
          <CancelButton
            @click="closeAlert"
          >Cancelar</CancelButton>
          <BaseButton 
            :loading="isLoading"
            :disabled="isSuccess || isLoading"
          >Aceptar</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>