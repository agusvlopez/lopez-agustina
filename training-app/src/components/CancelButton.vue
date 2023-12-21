<script setup>
import Loader from './Loader.vue';

defineProps({
    styleType: {
        type: String,
        default: 'normal'
    }
});
</script>
    
<template>
    <button type=""
        class="transition motion-reduce:transition-none rounded-full shadow text-indigo-700 px-4 py-2 border-2 border-indigo-50"
        :class="{
            'disabled:text-indigo-500': styleType == 'normal',
            'active:text-indigo-800': styleType == 'normal',
            'hover:bg-indigo-50': styleType == 'normal',
            'bg-white': styleType == 'normal'
        }">

        <template v-if="!loading">
            <slot>Cancelar</slot>
        </template>
        <template v-else>
            <!-- <slot class="disabled:bg-indigo-200">Enviar</slot> 
        <div class="sr-only">Cargando...</div> -->
            <Loader size="small" />
        </template>
    </button>
</template>