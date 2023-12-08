<!-- <script>
export default {
    name: 'BaseTextarea',

    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script> -->
<script setup>
defineProps(['modelValue']);

defineEmits(['update:modelValue']);
</script>

<template>
    <textarea 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        rows="1" 
        class="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
    ></textarea> 
</template>