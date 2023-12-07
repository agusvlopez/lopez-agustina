<script setup>
import SkeletonLoader from './SkeletonLoader.vue';

defineProps({
    loading: {
        type: Boolean,
        required: true,
        default: false,
    }
});
</script>

<template>
    <SkeletonLoader v-if="loading" />
    <slot v-else />
</template>