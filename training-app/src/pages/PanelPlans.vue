<script setup>
import { onMounted, ref } from 'vue';
import { getAllUsersWithTrainings } from '../services/user';
import BaseTable from '../components/BaseTable.vue';

// Estado de la aplicación
const allUsersTrainings = ref([]);

// Función para obtener todos los usuarios con entrenamientos al montar el componente
onMounted(async () => {
  try {
    // Obtenemos todos los usuarios con entrenamientos
    allUsersTrainings.value = await getAllUsersWithTrainings();
    console.log(allUsersTrainings.value);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
});

</script>

<template>
    <div>
        <BaseTable :items="allUsersTrainings" />
    </div>
</template>