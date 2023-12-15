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
        class="flex-1 rounded-full p-2 focus:outline-none" 
        placeholder="Escribe tu mensaje..."
        >
</template>