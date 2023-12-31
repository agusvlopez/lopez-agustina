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
    <div class="p-6">
        <SkeletonLoader v-if="loading" />
        <slot v-else />
    </div>
</template>