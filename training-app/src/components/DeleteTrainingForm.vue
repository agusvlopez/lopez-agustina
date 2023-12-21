<script setup>
import { inject, ref } from 'vue';
import { lookForAndDeleteDocument, deleteTrainingPhoto, getTrainings } from '../services/trainings';
import BaseButton from './BaseButton.vue';
import { notificationKey } from '../symbols/symbols';
import CancelButton from './CancelButton.vue';

const { notification, setNotification } = inject(notificationKey);

const emit = defineEmits(['closeAlert', 'deleteTraining', 'update-trainings']);
const props = defineProps(['deletedValue']);

const deletedTraining = ref(false);
const alert = ref(false);
const trainingsLoading = ref(false);
//const deletedValue = ref('');
const trainings = ref([]);


async function deleteTraining() {
    try {
        console.log(props.deletedValue);
        deletedTraining.value = true;

        // Obtén el documento a eliminar
        const trainingToDelete = await lookForAndDeleteDocument(props.deletedValue);
        console.log(trainingToDelete);
        if (!trainingToDelete) {
            console.log('No se encontró el documento a eliminar.');
            return;
        }

        // Verifica si hay una URL de imagen asociada al entrenamiento
        if (trainingToDelete.img) {
            deleteTrainingPhoto(trainingToDelete);
        }

        const trainingsAll = await getTrainings();
        emit('update-trainings', trainingsAll);

        // Restablece los estados
        alert.value = false;
        trainingsLoading.value = false;
        deletedTraining.value = false;

        emit('deleteTraining');

        setNotification({
            message: 'Entrenamiento eliminado con éxito.',
            type: 'success'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);

    } catch (error) {
        console.error('Error al eliminar el entrenamiento:', error);

        setNotification({
            message: 'Hubo un error al eliminar el entrenamiento. Por favor, intentá nuevamente mas tarde.',
            type: 'success'
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }
}

function closeAlert() {
    alert.value = false;
    emit('closeAlert');
}
</script>

<template>
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="bg-white p-8 shadow-lg rounded-lg max-w-md border-2 border-red-400 text-red-700">
            <p class="font-bold">¡Atención!</p>
            <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ deletedValue }}.
                </span>¿Estas seguro que queres eliminarlo?</span>
            <form action="#" @submit.prevent="deleteTraining">
                <div class="flex gap-4 justify-between mt-6">
                    <CancelButton @click="closeAlert()"> Cancelar
                    </CancelButton>
                    <BaseButton class="rounded-full p-3 ml-2" :styleType="'danger'" :loading="deletedTraining"> Eliminar
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>