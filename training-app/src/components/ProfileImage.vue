<script setup>
import Image from './Image.vue';
import noImage from '../imgs/no-image.jpg';

defineProps({
    src: {
        required: true
    },
    alt: {
        type: String
    }
})
</script>

<template>
    <Image
        :src="src"
        :alt="alt"
        :default="noImage"
        default-alt="No existe imagen de perfil"
    />
</template>