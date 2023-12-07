<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import BaseButton from '../components/BaseButton.vue';

const props = defineProps(['showModal', 'valorDeEliminacion']);
const emits = defineEmits(['delete-training', 'close-modal']);

const deleteTraining = () => {
  // Lógica para eliminar el entrenamiento
  emits('delete-training', props.valorDeEliminacion);
  // Cerrar el modal después de eliminar
  emits('close-modal');
};

const closeModal = () => {
  emits('close-modal');
};
</script>

<template>
  <div v-if="showModal" class="bg-red-100 border border-red-400 text-red-700 p-4 py-fit rounded relative max-w-fit mx-auto" role="alert">
    <p class="font-bold">¡Atención!</p>
    <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ valorDeEliminacion }}.</span> ¿Estás seguro que quieres eliminarlo?</span>
    <form action="" @submit.prevent="deleteTraining">
      <div class="flex justify-center">
        <BaseButton class="bg-red-500 hover:bg-red-600 mt-2">Eliminar</BaseButton>
      </div>
    </form>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-2">
      <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="closeModal">
        <title>Cerrar</title>
        <path d="M14.348 5.652a.5.5 0 01.704.704L9.703 10l5.35 5.35a.5.5 0 01-.704.704l-5.35-5.35-5.35 5.35a.5.5 0 01-.704-.704l5.35-5.35-5.35-5.35a.5.5 0 01.704-.704l5.35 5.35z" />
      </svg>
    </span>
  </div>
</template>