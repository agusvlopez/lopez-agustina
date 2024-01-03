<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { getTrainings } from '../services/trainings';
import LoadingContext from '../components/LoadingContext.vue';
import BaseH1 from '../components/BaseH1.vue';
import CreateTrainingForm from '../components/CreateTrainingForm.vue';
import DeleteTrainingForm from '../components/DeleteTrainingForm.vue';
import EditTrainingForm from '../components/EditTrainingForm.vue';
import PanelAdmin from './PanelAdmin.vue';


export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, LoadingContext, BaseH1, CreateTrainingForm, DeleteTrainingForm, EditTrainingForm, PanelAdmin },
    data() {
        return {
            editLoading: false,
            trainingsLoading: true,
            deletedTraining: false,
            documentId: null,
            trainings: [],
            deletedValue: '',
            alert: false,
            editForm: false,
            showingTrainingForm: false,
            training: {
                name: '',
                img: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
            editedTraining: {
                name: '',
                img: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
        };
    },
    methods: {
        openEdit(document) {
            this.editedTraining = { ...document };
            this.editForm = true;
            console.log('Edited Training:', this.editedTraining);
            this.documentId = document.id;
            console.log(this.documentId);
        },
        openAlert(event) {
            console.log(event);
            this.deletedValue = '';
            this.alert = true;
            this.deletedValue = event;
        },
        closeEdit() {
            this.editForm = false;
        },
        closeAlert() {
            this.alert = false;
        },
        showTrainingForm() {
            this.showingTrainingForm = true;
        },
        cancelTrainingForm() {
            this.showingTrainingForm = false;
        },
        handleCreateTraining(trainings) {
            this.trainings = trainings;
            this.showingTrainingForm = false;
        },
        handleDeleteTraining(trainings) {
            this.trainings = trainings;
            this.alert = false;
        },
        handleEditTraining(trainings) {
            this.trainings = trainings;
            this.editForm = false;
        }
    },
    async mounted() {
        this.trainingsLoading = true;

        try {
            const trainingsAll = await getTrainings();
            this.trainings = trainingsAll;
        } catch (error) {
            console.error('Error al obtener entrenamientos:', error);
        } finally {
            this.trainingsLoading = false;
        }
    },
    beforeDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    },
}
</script>

<template>
    <PanelAdmin />
    <section class="p-4 container mx-auto text-white">
        <h2 class="text-2xl text-center">Panel de entrenamientos</h2>
        <h3 class="text-2xl">Todos los entrenamientos</h3>
        <div class="flex gap-4 mt-4 mb-4">
            <BaseButton @click="showTrainingForm" class="rounded-full ">Agregar entrenamiento +</BaseButton>
        </div>
        <!-- CARDS DE ENTRENAMIENTOS... -->
        <div class="flex pt-4 flex-wrap">
            <LoadingContext :loading="trainingsLoading">
                <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4"
                    v-for="training in trainings" :key="training.id">
                    <div class="flex justify-end align-middle mb-4">
                        <button @click="openEdit(training)" class="font-bold text-indigo-500 flex items-center"> Editar
                            entrenamiento <span class="editIcon block ml-1"></span></button>
                    </div>
                    <form action="" @submit.prevent="openAlert(training.name)">
                        <div>
                            <div>
                                <img class="h-24 w-full object-cover" :src="training.img" :alt="training.name">
                            </div>
                            <div class="p-4">
                                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad
                                    {{ training.difficulty }}</div>
                                <a href="#"
                                    class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{
                                        training.name }}</a>
                                <p class="mt-1 text-gray-500">{{ training.description }}</p>
                                <p class="mt-1 text-indigo-500 text-lg font-semibold text-end">${{ training.price }}</p>

                                <BaseButton :styleType="'danger'" :value="training.name">Eliminar </BaseButton>
                            </div>
                        </div>
                    </form>
                </div>
            </LoadingContext>
        </div>
    </section>

    <!-- Modal de crear un entrenamiento -->
    <template v-if="!editForm">
        <CreateTrainingForm v-if="showingTrainingForm" @cancelTrainingForm="cancelTrainingForm"
            @update-trainings="handleCreateTraining"></CreateTrainingForm>
    </template>

    <!-- Modal de editar un entrenamiento -->
    <template v-if="editForm">
        <EditTrainingForm :editedTraining="editedTraining" :documentId="documentId" @edit="edit" @closeEdit="closeEdit"
            @update-trainings="handleEditTraining" />
    </template>

    <!-- Modal de eliminar un entrenamiento -->
    <template id="alertEliminar" role="alert" v-if="alert && !trainingsLoading && !deletedTraining">
        <DeleteTrainingForm @closeAlert="closeAlert" :deletedValue="deletedValue" @update-trainings="handleDeleteTraining">
        </DeleteTrainingForm>
    </template>
</template>