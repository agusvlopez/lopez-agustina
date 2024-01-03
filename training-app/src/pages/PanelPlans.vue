<script setup>
import { onMounted, ref } from 'vue';
import { getAllUsersWithTrainings } from '../services/user';
import BaseTable from '../components/BaseTable.vue';
import LoadingContext from '../components/LoadingContext.vue';
import BaseH1 from '../components/BaseH1.vue';
import PanelAdmin from './PanelAdmin.vue';


const allUsersTrainings = ref([]);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    try {
        allUsersTrainings.value = await getAllUsersWithTrainings();
        isLoading.value = false;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});
</script>

<template>
    <PanelAdmin />
    <section class="container p-4 mx-auto">
        <h2 class="text-white text-2xl text-center">Usuarios y sus planes contratados</h2>
        <LoadingContext :loading="isLoading">
            <BaseTable :items="allUsersTrainings" />
        </LoadingContext>
    </section>
</template>