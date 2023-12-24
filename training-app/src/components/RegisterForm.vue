<script setup>
import { inject, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { register } from '../services/auth.js';
import { useRouter } from 'vue-router';
import { notificationKey } from '../symbols/symbols';

const { notification, setNotification } = inject(notificationKey);

const router = useRouter();
const registerLoading = ref(false);
const registerError = ref(false);
const newUser = ref({
    email: '',
    password: '',
    rol: 'cliente',
});

const handleSubmit = async () => {
    registerLoading.value = true;
    try {
        const result = await register({ ...newUser.value });
        console.log(result);
        if (result.code === 'auth/email-already-in-use') {
            // El correo electrónico ya está en uso, manejarlo según tus necesidades
            setNotification({
                message: 'El correo electrónico ya está registrado.',
                type: 'error'
            });
            registerError.value = true;
        } else if (result.id) {
            // Registro exitoso
            router.push('/');
            setNotification({
                message: '¡Bienvenido/a!',
                type: 'success'
            });
            registerError.value = false;
        } else {
            // Otro tipo de error
            setNotification({
                message: 'Hubo un error durante el registro.',
                type: 'error'
            });
            registerError.value = true;
        }
    } catch (error) {
        // Manejar otros errores
        setNotification({
            message: 'Hubo un error durante el registro.',
            type: 'error'
        });
        registerError.value = true;
    }
    registerLoading.value = false;
};

</script>
<template>
    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput :disabled="registerLoading" type="email" id="email" v-model="newUser.email"
                placeholder="Ingresá tu correo electrónico" />
        </div>
        <div class="mb-8">
            <BaseLabel for="password">Contraseña <span class="text-sm font-normal">(mínimo 6 caracteres)</span></BaseLabel>
            <BaseInput :disabled="registerLoading" type="password" id="password" v-model="newUser.password"
                placeholder="Ingresá tu contraseña" />
        </div>
        <BaseButton :loading="registerLoading" class=" w-full">Crear cuenta</BaseButton>
    </form>
</template>