<script>
import Loader from './Loader.vue';

    export default {
    name: 'BaseButton',
    components: { Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },

}
</script>

<template>
    <button type="submit" class="transition motion-reduce:transition-none bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500 active:bg-indigo-800 disabled:bg-indigo-400"
    :disabled="loading">

    <div v-if="!loading">
        <slot>Enviar</slot>
    </div>
    <div v-else>
        <slot class="disabled:bg-indigo-200">Enviar</slot> 
        <div class="sr-only">Cargando...</div>
    </div>
    </button>

</template>