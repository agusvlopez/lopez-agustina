<script>
export default {
    name: 'BaseInput',

    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>

<template>
        <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="mb-3 border-b-2 border-gray-500 px-3 focus:outline-none focus:border-indigo-600 flex-grow" 
        >
</template>