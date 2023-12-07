<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { trainingsSaveTraining, getTrainings } from '../services/trainings';
import BaseLabel from './BaseLabel.vue';
import BaseInput from './BaseInput.vue';
import BaseTextarea from './BaseTextarea.vue';
import Basebutton from './basebutton.vue';

const training = ref({
  name: '',
  img: '',
  description: '',
  coach: '',
  price: 0,
  difficulty: '',
});

const trainings = ref([]);
const trainingsLoading = ref(false);

const saveTraining = async () => {
  try {
    // Guardar el entrenamiento
    await trainingsSaveTraining({
      name: training.value.name,
      img: training.value.img,
      description: training.value.description,
      coach: training.value.coach,
      price: training.value.price,
      difficulty: training.value.difficulty,
    });

    // Limpiar el formulario
    training.value.name = '';
    training.value.img = '';
    training.value.description = '';
    training.value.coach = '';
    training.value.price = 0;
    training.value.difficulty = '';

    // Cargar todos los entrenamientos nuevamente
    await loadTrainings();
  } catch (error) {
    console.error('Error al guardar el entrenamiento:', error);
  }
};

const loadTrainings = async () => {
  try {
    trainingsLoading.value = true;
    const allTrainings = await getTrainings();
    trainings.value.splice(0, trainings.value.length, ...allTrainings.map(d => d.data()));
  } catch (error) {
    console.error('Error al cargar los entrenamientos:', error);
  } finally {
    trainingsLoading.value = false;
  }
};

// Cancelar la suscripción al destruir el componente
const unsubscribe = loadTrainings;
onBeforeUnmount(() => unsubscribe());
</script>

<template>
     <h2 class="mt-4">Cargar un nuevo entrenamiento</h2>
    <form 
        action="#" 
        @submit.prevent="saveTraining"
        >
    <div class="w-auto">
        <section class="flex flex-wrap">
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="name" 
                v-model="training.name"
                class="shadow"
                required
                ></BaseInput> 
            </div>
        </div>
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="img" class="text-sm">URL de la imagen: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="img" 
                v-model="training.img"
                class="shadow"
                ></BaseInput> 
            </div>
        </div>
    </section>
        <div class="m-3">
            <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
            <div class="mt-2">
                <BaseTextarea
                id="description" 
                v-model="training.description"
                class="shadow"
                rows="4"
                required
                ></BaseTextarea> 
            </div>
        </div>
    
    <section class="flex flex-wrap">
        <div class="m-3 flex-auto">
            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="coach" 
                v-model="training.coach"
                class="shadow"
                required
                ></BaseInput>           
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
            <div class="mt-2">
                <BaseInput
                type="number"
                id="price" 
                v-model="training.price"
                class="shadow"
                required
                ></BaseInput>            
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="difficulty" 
                v-model="training.difficulty"
                class="shadow"
                required
                ></BaseInput>             
            </div>
        </div>
    </section>
    </div>
        <Basebutton class="rounded-full p-3 ml-2"
        ></Basebutton>    
    </form>  
</template>