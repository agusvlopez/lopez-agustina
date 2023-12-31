<script setup>
import BaseH1 from '../components/BaseH1.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="min-h-screen flex items-center justify-center backgroundDark">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <BaseH1>Iniciar sesión</BaseH1>
            <LoginForm />
        </div>
    </div>
</template>