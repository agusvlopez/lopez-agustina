<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { subscribeToAuth } from '../services/auth';
import { getAllUsersWithTrainings } from '../services/user';
import ProfileImage from '../components/ProfileImage.vue';
import BaseH1 from '../components/BaseH1.vue';
import LoadingContext from '../components/LoadingContext.vue';
import PanelAdmin from './PanelAdmin.vue';

const userLoading = ref(true);
const users = ref([]);
const nonAdminUsers = ref([]);

const authUser = ref({
    id: null,
    email: null,
    rol: null,
});

let unsubscribeAuth = () => { };

onMounted(async () => {
    try {
        userLoading.value = true;

        const allUsers = await getAllUsersWithTrainings();

        users.value = allUsers.map(user => {
            return {
                id: user.id,
                email: user.email,
                rol: user.rol,
                photoURL: user.photoURL,
                trainings: user.trainings,
            };
        });

        userLoading.value = false;

        unsubscribeAuth = subscribeToAuth(newUser => authUser.value = newUser);

        // Filtrar usuarios que no son administradores
        nonAdminUsers.value = users.value.filter(user => user.rol == 'cliente');
    } catch (error) {
        console.error('Error al obtener usuarios con entrenamientos:', error);
    }
});

onUnmounted(() => {
    unsubscribeAuth();
});
</script>

<template>
    <PanelAdmin />
    <section class="container p-4 mx-auto">
        <div class="mb-2">
            <h2 class="text-white text-2xl text-center">Chats con clientes</h2>
        </div>
        <div class="flex flex-wrap">
            <LoadingContext :loading="userLoading">
                <template v-for="user in nonAdminUsers" :key="user.id">
                    <div v-if="user.rol != 'admin'">
                        <div class="bg-white p-4 rounded-lg shadow m-2">
                            <div>
                                <ProfileImage :src="user.photoURL" alt="" class="pb-4 w-60 mx-auto" />
                                <p class="text-md font-semibold mt-4 m-2">Usuario: {{ user.email }}</p>
                                <p class="text-gray-600 m-2">Estado: Activo</p>
                                <router-link :to="`/usuario/${user.id}/chat`"
                                    class="m-2 transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800">Ver
                                    mensajes</router-link>
                            </div>
                        </div>
                    </div>
                </template>
            </LoadingContext>
        </div>
    </section>
</template>