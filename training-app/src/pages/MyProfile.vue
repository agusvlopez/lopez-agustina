<script setup>
import { useAuth } from '../functions/useAuth';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { editProfile, editProfilePhoto } from '../services/auth';
import { inject, onMounted, ref } from 'vue';
import { notificationKey } from '../symbols/symbols';
import { getUserTrainings } from '../services/user';
import BaseH1 from '../components/BaseH1.vue';
import SkeletonContext from '../components/SkeletonContext.vue';
import MyProfileData from '../components/MyProfileData.vue';

const { setNotification } = inject(notificationKey);

const { user } = useAuth();
const trainings = ref([]);
const trainingsLoading = ref(true);
// Obtener los entrenamientos del usuario
onMounted(async () => {
    trainings.value = await getUserTrainings(user.value.id);
    trainingsLoading.value = false;
});

const {
    editing,
    editingLoading,
    editData,
    handleEditShow,
    handleEditCancel,
    handleEditForm
} = useProfileEdit(user);

const {
    editingPhoto,
    editingPhotoLoading,
    photoData,
    handlePhotoFormShow,
    handlePhotoFormCancel,
    handlePhotoFormSubmit,
    handlePhotoFileChange
} = usePhotoEdit();

function useProfileEdit(user) {
    const editing = ref(false);
    const editingLoading = ref(false);
    const editData = ref({
        displayName: '',
    });

    const handleEditShow = () => {
        editData.value.displayName = user.value.displayName;
        editing.value = true;
    }
    const handleEditCancel = () => editing.value = false;
    const handleEditForm = async () => {
        try {
            editingLoading.value = true;
            await editProfile({
                displayName: editData.value.displayName,
            });

            setNotification({
                message: 'Se editó correctamente la información de tu perfil.',
                type: 'success'
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);

            handleEditCancel();
        } catch (error) {
            console.log("error: ", error);
            //Notificación de error          
            setNotification({
                message: 'Hubo un error y no se pudo editar la información de tu perfil. Por favor, intentá nuevamente mas tarde.',
                type: 'error'
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
        editingLoading.value = false;
    }

    return {
        editing,
        editingLoading,
        editData,
        handleEditShow,
        handleEditCancel,
        handleEditForm
    }
}

function usePhotoEdit() {
    const editingPhoto = ref(false);
    const editingPhotoLoading = ref(false);
    const photoData = ref({
        file: null,
        preview: null,
    });

    const handlePhotoFormShow = () => editingPhoto.value = true;

    const handlePhotoFormCancel = () => editingPhoto.value = false;

    const handlePhotoFormSubmit = async () => {
        editingPhotoLoading.value = true;

        try {
            await editProfilePhoto(photoData.value.file);
            handlePhotoFormCancel();

            setNotification({
                message: 'Foto agregada con éxito.',
                type: 'success'
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        } catch (error) {
            setNotification({
                message: "Hubo un error al intentar agregar la foto. Por favor intentá nuevamente mas tarde.",
                type: 'error'
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
            console.error(error);
        }
    }

    const handlePhotoFileChange = event => {
        console.log("evento: ", event);
        photoData.value.file = event.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', function () {
            photoData.value.preview = reader.result;
            console.log(reader.result);
        });

        reader.readAsDataURL(photoData.value.file);
    }

    return {
        editingPhoto,
        editingPhotoLoading,
        photoData,
        handlePhotoFormShow,
        handlePhotoFormCancel,
        handlePhotoFormSubmit,
        handlePhotoFileChange
    }
}
</script>

<template>
    <SkeletonContext :loading="trainingsLoading">
        <BaseH1 class="pt-6">Mi perfil</BaseH1>
        <!-- <template v-if="user.fullProfileLoaded && !trainingsLoading"> -->
        <template v-if="!editing && !editingPhoto">
            <section class="container p-4">

                <MyProfileData :user="user" :trainings="trainings" />

                <div class="flex gap-2">
                    <BaseButton @click="handleEditShow">Editar mis datos</BaseButton>

                    <BaseButton @click="handlePhotoFormShow">Editar mi foto de perfil</BaseButton>
                </div>
            </section>
        </template>
        <template v-else-if="editing">
            <form action="#" method="post" @submit.prevent="handleEditForm">
                <div class="mb-2">
                    <BaseLabel for="displayName">Nombre de Usuario</BaseLabel>
                    <BaseInput id="displayName" :disabled="editingLoading" v-model="editData.displayName" />
                </div>
                <BaseButton class="mb-4" :loading="editingLoading">Actualizar mis Datos</BaseButton>
            </form>
            <BaseButton @click="handleEditCancel">Cancelar</BaseButton>

        </template>
        <template v-else>
            <form action="#" method="post" @submit.prevent="handlePhotoFormSubmit">
                <div class="mb-2">
                    <BaseLabel for="newPhoto">Imagen de Perfil</BaseLabel>
                    <input class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100" type="file"
                        id="newPhoto" :disabled="editingPhotoLoading" @change="handlePhotoFileChange" />
                </div>
                <div class="mb-2" v-if="photoData.preview !== null">
                    <p>Previsualización de la imagen seleccionada</p>
                    <img :src="photoData.preview" alt="">
                </div>
                <BaseButton class="mb-4" :loading="editingPhotoLoading">Actualizar mi Imagen de Perfil</BaseButton>

                <hr class="mb-4">

                <BaseButton @click="handlePhotoFormCancel">Cancelar</BaseButton>
            </form>
        </template>
    </SkeletonContext>
</template>