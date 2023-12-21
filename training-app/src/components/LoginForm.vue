<script setup>
import { inject, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { login } from '../services/auth.js'
import { useRouter } from 'vue-router';
import { notificationKey } from '../symbols/symbols';

//Obtengo notification que lo provee App
//notification es una variable reactiva
const { notification, setNotification } = inject(notificationKey);

const router = useRouter();
const loginLoading = ref(false);
const loginError = ref(false);
const form = ref({
    email: '',
    password: '',
    rol: ''
});

const doLogin = async () => {
    try {
        loginLoading.value = true;
        await login({
            ...form.value,
        });

        setNotification({
            message: '¡Hola de nuevo!',
            type: 'success'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);

        router.push('/perfil');

    } catch (error) {
        setNotification({
            message: 'Error al iniciar sesión, por favor intentá nuevamente.',
            type: 'error'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }
    loginLoading.value = false;
}
</script>

<template>
    <form action="#" @submit.prevent="doLogin">
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput :disabled="loginLoading" type="email" id="email" v-model="form.email"
                placeholder="Ingresá tu correo electrónico" />
        </div>
        <div class="mb-6">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput :disabled="loginLoading" type="password" id="password" v-model="form.password"
                placeholder="Ingresá tu contraseña" />
        </div>
        <BaseButton :loading="loginLoading" class=" w-full">Ingresar</BaseButton>
    </form>
</template>