<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import viewImage from '../imgs/view.png';
import hideImage from '../imgs/hide.png';

const props = defineProps(['id', 'modelValue', 'placeholder', 'disabled']);
const emit = defineEmits();

const inputValue = ref(props.value);
const inputType = ref('password');
const showEyeIcon = ref(false);
const savedValue = ref('');

const togglePasswordVisibility = () => {
    inputType.value = inputType.value === 'password' ? 'text' : 'password';
    showEyeIcon.value = !showEyeIcon.value;

    if (inputType.value === 'text') {
        savedValue.value = inputValue.value;
    }
};

const updateInputValue = (event) => {
    inputValue.value = event.target.value;
    emit('update:modelValue', inputValue.value);
};

// Observa cambios en la propiedad 'value' y actualiza el valor guardado si es necesario
watch(() => props.value, (newValue) => {
    if (inputType.value === 'text') {
        savedValue.value = newValue;
    }
});
</script>

<template>
    <div class="relative">
        <input :type="inputType" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" :disabled="disabled" class="w-full px-3 py-2 border rounded-md" />
        <div v-if="showEyeIcon" class="w-8 absolute inset-y-0 right-0 pr-3 flex items-center">
            <img @click="togglePasswordVisibility" :src="viewImage" alt="" srcset="">
        </div>
        <div v-else class="w-8 absolute inset-y-0 right-0 pr-3 flex items-center">
            <img @click="togglePasswordVisibility" :src="hideImage" alt="" srcset="">
        </div>
    </div>
</template>