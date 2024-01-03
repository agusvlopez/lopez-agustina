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
    email: 'cliente@cliente.com',
    password: '123456',
    rol: 'cliente'
});
const formAdmin = ref({
    email: 'admin@admin.com',
    password: '123456',
    rol: 'admin'
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
const doLoginAdmin = async () => {
    try {
        loginLoading.value = true;
        await login({
            ...formAdmin.value,
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
    <section class="md:flex">
        <div class="bg-white p-8 rounded-lg shadow-md md:w-96 mb-4 md:mb-0 md:mr-4 w-96">
            <form action=" #" @submit.prevent="doLogin()">
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
                <BaseButton :loading="loginLoading" class="w-full">Ingresar como Cliente</BaseButton>
            </form>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-md md:w-96 w-96">
            <form action="#" @submit.prevent="doLoginAdmin()">
                <div class="mb-3">
                    <BaseLabel for="emailAdmin">Email Admin</BaseLabel>
                    <BaseInput :disabled="loginLoading" type="email" id="emailAdmin" v-model="formAdmin.email"
                        placeholder="Ingresá tu correo electrónico (admin)" />
                </div>
                <div class="mb-6">
                    <BaseLabel for="passwordAdmin">Contraseña Admin</BaseLabel>
                    <BaseInput :disabled="loginLoading" type="password" id="passwordAdmin" v-model="formAdmin.password"
                        placeholder="Ingresá tu contraseña (admin)" />
                </div>
                <BaseButton :loading="loginLoading" class="w-full">Ingresar como Admin</BaseButton>
            </form>
        </div>
    </section>
</template>