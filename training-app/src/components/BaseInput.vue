<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true,
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block w-full mb-3 border-2 rounded border-gray-400 p-2 focus:outline-none focus:border-indigo-600 flex-grow disabled:bg-gray-100 disabled:text-gray-500" 
    >
</template>