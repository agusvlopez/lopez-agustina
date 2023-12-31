<script setup>
import LoadingContext from '../components/LoadingContext.vue';
import BaseButton from '../components/BaseButton.vue';
import { ref, onMounted, inject } from 'vue';
import { getDocumentId, getTrainings, truncateText } from '../services/trainings';
import { addTrainingToUser } from '../services/user';
import { getUserId } from '../services/auth';
import { notificationKey } from '../symbols/symbols';
import BaseH1 from '../components/BaseH1.vue';
import ModalNotification from '../components/ModalNotification.vue';
import { useAuth } from '../functions/useAuth';
import { useRouter } from 'vue-router';

const { notification, setNotification } = inject(notificationKey);
const { user } = useAuth();
const router = useRouter();

const trainings = ref([]);
const trainingsLoading = ref(true);
const trainingIsAlreadyAdded = ref(false);
const selectedTraining = ref(null);
const isModalVisible = ref(false);

onMounted(async () => {
    try {
        const trainingsAll = await getTrainings();
        trainingsLoading.value = true;
        trainings.value = trainingsAll;
        trainingsLoading.value = false;
    } catch (error) {
        console.log('Error:', error);
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
        trainingIsAlreadyAdded.value = true;

        setNotification({
            message: 'Entrenamiento ya contratado.',
            type: 'error'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }
}

function handleModalSubmit(training) {
    selectedTraining.value = training;
    isModalVisible.value = true;
    trainingIsAlreadyAdded.value = false; // Resetear el estado al abrir el modal
}

function handleModalClose() {
    isModalVisible.value = false;
    if (trainingIsAlreadyAdded.value) {
        setNotification({
            message: 'Entrenamiento ya contratado.',
            type: 'error'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }
}

function goLogin() {
    router.push('/iniciar-sesion');
}
</script>

<template>
    <div class="backgroundDark">
        <section class="container p-6 mx-auto">
            <BaseH1 class="text-white">Precios de nuestros planes de entrenamiento</BaseH1>
            <LoadingContext :loading="trainingsLoading">
                <div class="flex p-4 flex-wrap gap-3">
                    <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                        v-for="training in trainings" :key="training.id">
                        <div>
                            <div>
                                <img class="h-72 w-full object-cover" :src="training.img" :alt="training.name">
                            </div>
                            <div class="p-4">
                                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad
                                    {{ training.difficulty }}</div>
                                <h2 class="block mt-1 text-lg leading-tight font-medium text-black">{{ training.name }}</h2>
                                <p class="mt-2 text-gray-500">{{ truncateText(training.description, 150) }}</p>
                                <p class="mt-4 text-indigo-500 text-lg font-semibold text-end">${{ training.price }}</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center p-2">
                            <BaseButton class="m-2" @click="handleModalSubmit(training)">Obtener entrenamiento</BaseButton>
                        </div>
                    </div>
                    <ModalNotification v-if="isModalVisible && user.id" :title="selectedTraining.name"
                        :price="selectedTraining.price"
                        :message="`Apretá en Aceptar para contratar el entrenamiento. ¡Muchas gracias!`"
                        :submitAction="() => addTrainingToCurrentUser(selectedTraining)" @closeAlert="handleModalClose" />
                    <ModalNotification v-else-if="isModalVisible" :title="selectedTraining.name"
                        :price="selectedTraining.price"
                        :message="`¡Tenés que iniciar sesión para comprar un entrenamiento!`" :submitAction="goLogin"
                        :buttonName="`Iniciar sesión`" @closeAlert="handleModalClose" />
                </div>
            </LoadingContext>
        </section>
    </div>
</template>