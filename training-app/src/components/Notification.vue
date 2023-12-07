<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['message', 'type',]);
// const isVisible = ref(true);

// onMounted(() => {
//   // Oculta la notificación después de 1 segundo
//   setTimeout(() => {
//     isVisible.value = false;
//   }, 1000);
// });
</script>

<template>
  <div
    v-if="message != null"
    class="p-4 border rounded mb-4"
    :class="{
      'border-green-700': type == 'success',
      'text-green-700': type == 'success',
      'bg-green-100': type == 'success',
      'border-red-700': type == 'error',
      'text-red-700': type == 'error',
      'bg-red-100': type == 'error',
    }"
  >
    {{ message }}
  </div>
</template>