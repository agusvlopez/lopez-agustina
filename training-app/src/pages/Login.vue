<script setup>
import BaseH1 from '../components/BaseH1.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="min-h-screen flex items-center justify-center backgroundDark">
        <div>
            <BaseH1 class="text-white">Iniciar sesión</BaseH1>
            <LoginForm />
        </div>
    </div>
</template>