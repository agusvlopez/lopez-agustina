<script setup>
import BaseButton from './BaseButton.vue';

defineProps({
    user: {
        type: Object,
        required: true,
    }
});
</script>

<template>
                <div class="flex gap-4">
                <div class="w-2/12">
                    <img
                        v-if="user.photoURL != null" 
                        :src="user.photoURL" 
                        alt=""
                        class="pb-4"
                    >
                    <p v-else>"No existe una imagen aún."</p>
                </div>
                <dl class="w-10/12 mb-4">
                    <dt class="mb-1 font-bold">Email</dt>
                    <dd class="mb-2">{{ user.email }}</dd>
                    <dt class="mb-1 font-bold">Nombre de Usuario</dt>
                    <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
                    <dt class="mb-1 font-bold">Entrenamientos contratados:</dt>
                    <dd class="mb-2">{{ user.trainings || 'No hay entrenamientos contratados' }}</dd>
                </dl> 
            </div>
</template>