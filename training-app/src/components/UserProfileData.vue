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
    <div class="flex gap-4">
        <div class="w-2/12">
            <ProfileImage
                :src="user.photoURL"
                class="pb-4"
            />
        </div>
        <dl class="w-10/12 mb-4">
            <dt class="mb-1 font-bold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
            <dt class="mb-1 font-bold">Nombre de Usuario</dt>
            <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
            <dt class="mb-1 font-bold">Entrenamientos contratados:</dt>
            <dd class="mb-2 mt-2">
                <ul>
                    <li v-for="training in trainings" :key="training.id">
                        <span class="dumbbellIcon inline-block mr-1"></span>
                        {{ training.training.name }} - Dificultad: {{ training.training.difficulty }}
                    </li>
                </ul>
                <p v-if="trainings.length === 0">No hay entrenamientos contratados.</p>
            </dd>
        </dl> 
    </div>
</template>