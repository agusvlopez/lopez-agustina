<script setup>
import { onMounted, ref } from 'vue';
import { getAllUsersWithTrainings } from '../services/user';
import BaseTable from '../components/BaseTable.vue';
import LoadingContext from '../components/LoadingContext.vue';
import BaseH1 from '../components/BaseH1.vue';

// Estado de la aplicación
const allUsersTrainings = ref([]);
const isLoading = ref(false);

// Función para obtener todos los usuarios con entrenamientos al montar el componente
onMounted(async () => {
    isLoading.value = true;
  try {
    // Obtenemos todos los usuarios con entrenamientos
    allUsersTrainings.value = await getAllUsersWithTrainings();
    console.log(allUsersTrainings.value);
    isLoading.value = false;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
});

</script>

<template>
    <BaseH1>Usuarios y sus planes contratados</BaseH1>
    <LoadingContext :loading="isLoading">
        <BaseTable :items="allUsersTrainings" />
    </LoadingContext>
</template>