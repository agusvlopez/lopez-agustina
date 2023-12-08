<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { getTrainingIds, getTrainings, trainingsSaveTraining, trainingsEditTraining, buscarYEliminarDocumento } from '../services/trainings';
import Loader from '../components/Loader.vue';

export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            editLoading: false,
            trainingsLoading: true,
            deletedTraining: false,
            documentId: null,
            trainings: [],
            editTraining: false,
            valorDeEliminacion: '',
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
            newTraining: {
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
     async saveTraining() {
            let array = []; 
           
            trainingsSaveTraining({ 
                name: this.training.name,
                img: this.training.img,
                description: this.training.description,
                coach: this.training.coach,
                price: this.training.price,
                difficulty: this.training.difficulty,
            })
                .then(() => {
                 this.trainingsLoading = false;
                this.training.name = '';
                this.training.img = '',
                this.training.description = '';
                this.training.coach = '';
                this.training.price = 0;
                this.training.difficulty = '';
                let trainingDoc;
             
                // this.newMessageSaving = false;
            });
             let trainingDoc;
             let allTrainings = await getTrainings();
             allTrainings.forEach(async d => {
                 trainingDoc = d.data();
                 array.push(trainingDoc);
            });
            this.trainings = array;
            this.showingTrainingForm = false;
        },

        async deleteTraining(valor) {
            let docs = [];
            this.deletedTraining = true;
            let trainingDocument;
            buscarYEliminarDocumento(valor)
            
            let trainingsDocs = await getTrainings();

            trainingsDocs.forEach(async docu => {
                trainingDocument = docu.data();
                docs.push(trainingDocument);
            });
            this.trainings = docs;
          
            this.alert = false;
            this.trainingsLoading = false;
            this.deletedTraining = false;
            this.valorDeEliminacion = ''; 
        },

        async edit() {
            try {
                this.editLoading = true;

                const trainingIds = await getTrainingIds();
                const trainingId = trainingIds[0];

                await trainingsEditTraining(trainingId, {
                    name: this.editedTraining.name,
                    img: this.editedTraining.img,
                    description: this.editedTraining.description,
                    coach: this.editedTraining.coach,
                    price: this.editedTraining.price,
                    difficulty: this.editedTraining.difficulty,
                });

                const index = this.trainings.findIndex(t => t.id === this.editedTraining.id);
                if (index !== -1) {
                    this.trainings[index] = { ...this.editedTraining };
                }
                console.log('Entrenamiento actualizado con éxito');
            } catch (error) {
                console.error('Error al actualizar el entrenamiento:', error);
            } finally {
                this.editLoading = false;
                this.editForm = false;
            }
        },
        editTrue() {
            this.editTraining = true;
        },
        editFalse() {
            this.rolLoading = false;
            this.editTraining = false;
        },
        openAlert(event) {
            this.valorDeEliminacion = '';
            this.alert = true;
            this.valorDeEliminacion = event;
        },
        openEdit(document){
            this.editedTraining = { ...document };
            this.editForm = true;
            console.log('Edited Training:', this.editedTraining);
        },
        closeEdit(){
            this.editForm = false;
        },
        closeAlert(){
            this.alert = false;
        },
        showTrainingForm () {
        this.showingTrainingForm = true;
        },
        cancelTrainingForm () {
            this.showingTrainingForm = false;
        }
    },
    async mounted () {    
        this.trainingsLoading = true; 
      
         console.log();
        console.log(this.trainings);
        let trainingsAll = await getTrainings();
      
        let trainingDoc;
        trainingsAll.forEach(async d => {
            trainingDoc = d.data();
            this.trainings.push(trainingDoc); 
        });
        this.trainingsLoading = false;

        return this.trainingDoc;
    },

    beforeDestroy() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
    },
}
</script>

<template class="container mx-auto p-4">
   <section class="border-b-2">
        <h1>Panel de entrenamientos</h1>
        <h2>Todos los entrenamientos </h2>
        <div class="flex gap-4 mt-4 mb-4">
            <BaseButton
                @click="showTrainingForm"
                class="rounded-full "
            >Agregar entrenamiento +</BaseButton>
        </div>
        <div id="alertEliminar" role="alert"
            v-if="alert && !trainingsLoading  && !deletedTraining"
        >
            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div class="bg-white p-8 shadow-lg rounded-lg max-w-md border-2 border-red-400 text-red-700">    
                <p class="font-bold">¡Atención!</p>
                    <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ this.valorDeEliminacion }}. </span>¿Estas seguro que queres eliminarlo?</span>
                    <form action="#" 
                        @submit.prevent="deleteTraining(this.valorDeEliminacion)"
                    >
                    <div class="flex gap-4 justify-between mt-4">
                        <BaseButton 
                        @click="closeAlert()"
                            class="mt-2"> Cancelar
                        </BaseButton>
                        <BaseButton 
                            class="bg-red-500 hover:bg-red-600 mt-2"> Eliminar
                        </BaseButton>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex p-4 flex-wrap">    
            <template
            v-if="!trainingsLoading  && !deletedTraining && !editLoading" >
            <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4"
            v-for="training in trainings"
            :key="training.id"  
            >
            <form action=""
            @submit.prevent="openAlert(training.name)">
                <div>
                <div>
                    <img class="h-24 w-full object-cover" :src="training.img" :alt="training.name">
                </div>
                <div class="p-4">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
                    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{training.name}}</a>
                    <p class="mt-1 text-gray-500">{{training.description}}</p>
                    <p class="mt-1 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>

                    <BaseButton 
                    class="bg-red-500 hover:bg-red-600 mt-2"
                    :value="training.name"
                    id="buttonAlert"
                >Eliminar </BaseButton>
                </div>
                </div>
            </form>
                <div class="flex justify-end align-middle">
                    <button @click="openEdit(training)" class="font-bold text-indigo-500 flex items-center"> Editar entrenamiento <span class="editIcon block ml-1"></span></button>
                </div>
                </div>  
            </template>
            <template
            v-else>
                <Loader></Loader>
            </template>
        </div>
    </section>
        <template 
        v-if="!editForm">
        <!-- <TrainingForm v-if="showingTrainingForm" /> -->
            <div v-if="showingTrainingForm">
                <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div class="bg-white p-6 shadow-md rounded-lg max-w-xxl">
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
                                    placeholder="Escribe la descripción del entrenamiento..."
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
                        <div class="flex justify-between">
                            <button 
                                class="rounded-full shadow text-indigo-700 p-3 ml-2"
                                @click="cancelTrainingForm"
                            >Cancelar</button> 
                            <BaseButton 
                            class="rounded-full p-3 ml-2"
                            ></BaseButton>  
                        </div> 
                    </form>   
                </div>
            </div>  
        </div>
    </template>
    <template v-if="editForm">
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
                            <BaseLabel for="img" class="text-sm">URL de la imagen: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="img"
                                v-model="editedTraining.img"
                                class="shadow"
                                :placeholder="editedTraining.img"
                                required
                            ></BaseInput>
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
                        <div class="p-2 w-full lg:w-1/2">
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
                        <div class="p-2 w-full lg:w-1/2">
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
                        <div class="p-2 w-full sm:w-1/2">
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
                        <BaseButton class="rounded-full p-3 ml-2">Editar</BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </template>
</template>