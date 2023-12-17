<script setup>
import { inject, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';
import BaseTextarea from './BaseTextarea.vue';
import { trainingsEditTraining, editTrainingPhoto, getTrainings } from '../services/trainings';
import { loadImage } from '../services/storage';
import { notificationKey } from '../symbols/symbols';

const { notification, setNotification } = inject(notificationKey);

const { editedTraining, documentId } = defineProps(['editedTraining', 'documentId']);
const emit = defineEmits();

const editLoading = ref(false);
const editForm = ref(false);
const photoData = ref({
  file: null,
  preview: null,
});

const handlePhotoFileChange = (event) => {
  photoData.value.file = event.target.files[0];
  loadImage(photoData.value.file, 'img', editedTraining);
};

const edit = async () => {
    editLoading.value = true;

  try {
    let imageUrl = editedTraining.img;

    if (photoData.value.file) {
      imageUrl = await editTrainingPhoto(photoData.value.file, documentId);
    }

    await trainingsEditTraining(documentId, {
      name: editedTraining.name,
      img: imageUrl,
      description: editedTraining.description,
      coach: editedTraining.coach,
      price: editedTraining.price,
      difficulty: editedTraining.difficulty,
    });

    console.log('Entrenamiento actualizado con éxito');

    const trainingsAll = await getTrainings();
    emit('update-trainings', trainingsAll); 

    setNotification({
        message: 'Entrenamiento editado con éxito.',
        type: 'success'
    });
    setTimeout(() => {
        setNotification(null);
    }, 3000);

  } catch (error) {
    console.error('Error al actualizar el entrenamiento:', error);

    setNotification({
        message: 'Hubo un error al editar el entrenamiento. Por favor, intentá nuevamente mas tarde.',
        type: 'success'
    });
    setTimeout(() => {
        setNotification(null);
    }, 3000);

  } finally {
    editLoading.value = false;
    editForm.value = false;
    emit('close-edit'); 
  }
};

const closeEdit = () => {
  editForm.value = false;
  emit('close-edit'); 
};

</script>

<template>
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="bg-white p-6 shadow-md rounded-lg max-w-xxl">
                <p class="text-xl font-semibold mb-4">Editar Entrenamiento</p>
                <form action="#" 
                    @submit.prevent="edit"
                >
                    <div class="flex flex-wrap">
                        <div class="p-2 w-full lg:w-1/2">
                            <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="name"
                                v-model="editedTraining.name"
                                class="shadow"
                                :placeholder="editedTraining.name"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full lg:w-1/2">
                            <div class="flex">
                                <div
                                    v-if="editedTraining.img !== null"
                                >
                                    <img class="w-36 pr-2" :src="editedTraining.img" alt="">
                                </div>
                                <div>
                                    <BaseLabel for="newPhoto">Imagen de Perfil</BaseLabel>
                                    <input 
                                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
                                        type="file"
                                        id="newPhoto"
                                        :disabled="editLoading"
                                        @change="handlePhotoFileChange"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
                        <div class="mt-2">
                            <BaseTextarea
                            id="description"
                            v-model="editedTraining.description"
                            class="shadow"
                            rows="4"
                            :placeholder="editedTraining.description"
                            required
                            ></BaseTextarea>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="p-2 w-full lg:w-1/3">
                            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="coach"
                                v-model="editedTraining.coach"
                                class="shadow"
                                :placeholder="editedTraining.coach"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full lg:w-1/3">
                            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                type="number"
                                id="price"
                                v-model="editedTraining.price"
                                class="shadow"
                                :placeholder="editedTraining.price"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full sm:w-1/3">
                            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="difficulty"
                                v-model="editedTraining.difficulty"
                                class="shadow"
                                :placeholder="editedTraining.difficulty"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-4 justify-end">
                        <button 
                        @click="closeEdit"
                        class="rounded-full shadow-lg text-indigo-700 p-3 ml-2"
                        >Cerrar</button>
                        <BaseButton 
                        class="rounded-full p-3 ml-2"
                        :loading="editLoading"
                        >Editar</BaseButton>
                    </div>
                </form>
            </div>
        </div>
</template>