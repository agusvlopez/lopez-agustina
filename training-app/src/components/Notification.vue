<script setup>

const props = defineProps(['message', 'type',]);

</script>

<template>
  <div
    v-if="message != null"
    class="p-4 border rounded mb-4 fixed top-3 left-3 w-fit h-fit flex items-center justify-center"
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