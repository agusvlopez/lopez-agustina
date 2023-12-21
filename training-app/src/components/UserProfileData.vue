<script setup>
import Chat from './Chat.vue';
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
        <div class="w-8/12 mb-4">
            <h2 class="mt-2">Chat con {{ user.email }}</h2>
            <router-link :to="`/usuario/${user.id}/chat`"
                class="transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800">Abrir chat
                »</router-link>
            <Chat />
        </div>
    </div>
</template>