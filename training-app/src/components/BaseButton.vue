<script setup>
import Loader from './Loader.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    styleType: {
        type: String,
        default: 'normal'
    }
});
</script>

<template>
    <button type="submit" 
    :disabled="loading"
    class="transition motion-reduce:transition-none text-white px-4 py-2 rounded"
    :class="{
        'disabled:bg-indigo-400' : styleType == 'normal',
        'active:bg-indigo-800': styleType == 'normal',
        'hover:bg-indigo-500': styleType == 'normal',
        'bg-indigo-600': styleType == 'normal',
        'disabled:bg-red-400': styleType == 'danger',
        'active:bg-red-800': styleType == 'danger',
        'hover:bg-red-500': styleType == 'danger',
        'bg-red-600': styleType == 'danger',
    }"
    >

    <div v-if="!loading">
        <slot>Enviar</slot>
    </div>
    <div v-else>
        <!-- <slot class="disabled:bg-indigo-200">Enviar</slot> 
        <div class="sr-only">Cargando...</div> -->
        <Loader size="small" />
    </div>
    </button>

</template>