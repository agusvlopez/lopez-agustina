<script setup>
defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    default: {},
    defaultAlt: {
        type: String,
    },
});
</script>

<template>
    <img v-if="src != null" :src="src" :alt="alt" class="max-w-full" />
    <img v-else :src="default" :alt=" defaultAlt || 'Sin imagen' " class="max-w-full" />
</template>
