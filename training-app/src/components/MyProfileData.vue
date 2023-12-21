<script setup>
import ProfileImage from './ProfileImage.vue';

defineProps({
    user: {
        type: Object,
        required: true,
    },
    trainings: {
        type: Array,
        default: () => [],
    },
});

</script>

<template>
    <div class="flex gap-4 mx-auto">
        <div class="w-2/12">
            <ProfileImage :src="user.photoURL" class="mb-4 rounded-full" />
        </div>
        <dl class="w-8/12 mb-4">
            <dt class="mb-1 font-bold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
            <dt class="mb-1 font-bold">Nombre de Usuario</dt>
            <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
            <dt class="mb-1 font-bold">Entrenamientos contratados:</dt>
            <dd class="mb-2 mt-2">
                <ul>
                    <li v-for="training in trainings" :key="training.id">
                        <span class="dumbbellIcon inline-block mr-1"></span>
                        {{ training.name }} - Dificultad: {{ training.difficulty }}
                    </li>
                </ul>
                <p v-if="trainings.length === 0">No hay entrenamientos contratados.</p>
            </dd>
        </dl>
        <section v-if="user.rol == 'cliente'" class="p-4 mt-2">
            <h2 class="text-xl font-bolder">Mis mensajes con Training App</h2>
            <p class="mt-2 font-bold text-indigo-600 hover:text-indigo-700">
                <router-link to="/usuario/d6dfuuXe7laEyCh33M0uxKtb9xk1/chat">Ir a la conversación »</router-link>
            </p>
        </section>
    </div>
</template>