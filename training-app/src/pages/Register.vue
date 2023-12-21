<script setup>
import BaseH1 from '../components/BaseH1.vue';
import RegisterForm from '../components/RegisterForm.vue';

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <BaseH1>Crear cuenta</BaseH1>
            <RegisterForm />
        </div>
    </div>
</template>