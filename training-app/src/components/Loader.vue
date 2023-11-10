<!-- <script>

export default {
    name: 'Loader',
    props: {
        size: {
            type: String,
            default: 'normal'   
        },
    },
    computed: {
        loaderClass() {
            return {
                'loader-sm': this.size === 'small',
                'loader': this.size === 'normal'
            }
        }
    }
}

</script> -->

<script setup>
import { computed } from 'vue';
import { BUTTON_SIZES, BUTTON_SIZE_NORMAL,BUTTON_SIZE_SMALL } from './../constants/constants';

//capturamos el retorno de la funcion defineProps para poder usar las propiedades en el script
const props = defineProps( {
    size: {
        type: String,
        default: BUTTON_SIZE_NORMAL,
        validator: value => BUTTON_SIZES.includes(value),
    },
});

const loaderClass = computed(() => {
    return {
        'loader-mini': props.size === BUTTON_SIZE_SMALL,
        'loader': props.size === BUTTON_SIZE_NORMAL || !BUTTON_SIZES.includes(props.size),
    }
});
</script>
<template>

    <div :class="loaderClass">
        <div class="sr-only">Cargando...</div>
    </div>
</template>