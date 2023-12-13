<script setup>
import Loader from '../components/Loader.vue';
import Basebutton from '../components/basebutton.vue';
import { ref, onMounted, inject } from 'vue';
import { getTrainingIds, getTrainings } from '../services/trainings';
import { addTrainingToUser, getUserTrainings } from '../services/user';
import { getUserId } from '../services/auth';
import { notificationKey } from '../symbols/symbols';

const { notification, setNotification } = inject(notificationKey);

const trainings = ref([]);
const trainingsLoading = ref(true);
const trainingIsAlreadyAdded = ref(false);

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

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
      await addTrainingToUser(userId, training);

      setNotification({
        message: 'Entrenamiento contratado con éxito.',
        type: 'success'
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);

  } catch (error) {
    
    setNotification({
        message: 'Entrenamiento ya contratado.',
        type: 'error'
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
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
                    <div class="p-4">
                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
                        <h2 class="block mt-1 text-lg leading-tight font-medium text-black">{{training.name}}</h2>
                        <p class="mt-2 text-gray-500">{{ truncateText(training.description, 150) }}</p>
                        <p class="mt-4 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>
                    </div>            
                </div>
                <div class="flex justify-center items-center p-2">
                <Basebutton 
                  class="m-2"
                  @click="addTrainingToCurrentUser(training)"
                  :disabled="trainingIsAlreadyAdded"
                >Obtener entrenamiento</Basebutton>
                </div>
            </div>
        </div>
    </template>
    <template 
    v-else>
        <Loader></Loader>
    </template>
</section>
</template>