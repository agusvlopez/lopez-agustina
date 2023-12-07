<script setup>
import Loader from './Loader.vue';

defineProps({
    loading: {
        type: Boolean,
        required: true,
        default: false,
    }
});
</script>

<template>
    <Loader v-if="loading" />
    <slot v-else />
</template>