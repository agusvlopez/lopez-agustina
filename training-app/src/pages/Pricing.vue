<script setup>
import Loader from '../components/Loader.vue';
import Basebutton from '../components/basebutton.vue';
import { ref, onMounted, inject } from 'vue';
import { getTrainings } from '../services/trainings';
import { addTrainingToUser } from '../services/user';
import { getUserId } from '../services/auth';
import { notificationKey } from '../symbols/symbols';

const { notification, setNotification } = inject(notificationKey);

const trainings = ref([]);
const trainingsLoading = ref(true);

onMounted(async () => {
  try {
    const trainingsAll = await getTrainings();
    trainingsLoading.value = true;

    trainings.value = trainingsAll.map(doc => doc.data());

    trainingsLoading.value = false;
  } catch (error) {
    console.error('Error:', error);
  }
});

const addTrainingToCurrentUser = async (training) => {
  const userId = getUserId();
  try {
    if (userId) {
      await addTrainingToUser(userId, training);
      setNotification({
        message: 'Entrenamiento contratado con éxito.',
        type: 'success'
      });
    } else {
      setNotification({
            message: 'Hubo un error al intentar contratar el entrenamiento. Por favor intente nuevamente más tarde.',
            type: 'error'
        });
    }
  } catch (error) {
    console.error('Error al añadir el entrenamiento al usuario:', error);
  }
};
</script>

<template>
<section class="container p-6 bg-gray-200">
    <h1 class="text-center mb-4 font-bold">Precios de nuestros planes de entrenamiento</h1>
    <template v-if="!trainingsLoading">
        <div class="flex p-4 flex-wrap">
            <div class="mb-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            v-for="training in trainings" :key="training.id">
                <div>
                    <div>
                        <img class="h-72 w-full object-cover" :src="training.img" :alt="training.name">
                    </div>
                    <div class="p-8">
                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
                        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{training.name}}</a>
                        <p class="mt-2 text-gray-500">{{training.description}}</p>
                        <p class="mt-4 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>
                    </div>            
                </div>
                <Basebutton 
                class="m-2"
                @click="addTrainingToCurrentUser(training)"
                >Obtener entrenamiento</Basebutton>
            </div>
        </div>
    </template>
    <template 
    v-else>
        <Loader></Loader>
    </template>
</section>
</template>