<script>
import { collection, deleteDoc, doc, documentId, getDocs, query, updateDoc, where } from 'firebase/firestore';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { getTrainings, trainingsSaveTraining, getTrainingDocs, buscarYEliminarDocumento } from '../services/trainings';
import { db } from '../services/firebase';
import Loader from '../components/Loader.vue';
import TrainingForm from '../components/TrainingForm.vue';
import DeleteTrainingModal from '../components/DeleteTrainingModal.vue';

export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader, TrainingForm, DeleteTrainingModal },
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

                const docRef = this.$fire.firestore.collection('trainings').doc(this.training.id);
                const nuevosDatos = {
                name: this.training.name,
                img: this.training.img,
                description: this.training.description,
                coach: this.training.coach,
                price: this.training.price,
                difficulty: this.training.difficulty,
                };

                await docRef.update(nuevosDatos);

                // Actualiza el entrenamiento en la lista local
                const index = this.trainings.findIndex(t => t.id === this.training.id);
                if (index !== -1) {
                this.trainings[index] = nuevosDatos;
                }

                console.log('Documento actualizado con éxito');
            } catch (error) {
                console.error('Error al actualizar el documento:', error);
            } finally {
                this.editLoading = false;
                this.editForm = false; // Cierra el formulario después de la edición
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
            this.editForm = true;
            this.training = document;
        },
        closeAlert(){
            this.alert = false;
        },

        showTrainingForm () {
        // Aquí puedes agregar lógica adicional si es necesario
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

      // Asegúrate de cancelar la suscripción cuando el componente se destruye
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

}
</script>

<template>
<div class="container mx-auto p-4">
   <section class="border-b-2">
    <h1>Panel de entrenamientos</h1>
    <h2>Todos los entrenamientos </h2>
   
    <div id="alertEliminar" class="bg-red-100 border border-red-400 text-red-700 p-4 py-fit rounded relative max-w-fit mx-auto" role="alert"
        v-if="alert && !trainingsLoading  && !deletedTraining"
        >
            <!-- Usar el componente DeleteTrainingModal -->
    <!-- <DeleteTrainingModal
      :show-modal="alert && !trainingsLoading && !deletedTraining"
      :valor-de-eliminacion="valorDeEliminacion"
      @delete-training="deleteTraining"
      @close-modal="closeAlert"
    ></DeleteTrainingModal> -->
        <p class="font-bold">¡Atención!</p>
        <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ this.valorDeEliminacion }}. </span>¿Estas seguro que queres eliminarlo?</span>
        <form action="" 
            @submit.prevent="deleteTraining(this.valorDeEliminacion)"
        >
        <div class="flex justify-center">
            <BaseButton 
                class="bg-red-500 hover:bg-red-600 mt-2"> Eliminar
            </BaseButton>
        </div>
        </form>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-2">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="closeAlert()">
            <title>Cerrar</title>
            <path d="M14.348 5.652a.5.5 0 01.704.704L9.703 10l5.35 5.35a.5.5 0 01-.704.704l-5.35-5.35-5.35 5.35a.5.5 0 01-.704-.704l5.35-5.35-5.35-5.35a.5.5 0 01.704-.704l5.35 5.35z" />
        </svg>
        </span>
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
    <div class="flex gap-4">
        <BaseButton @click="showTrainingForm">Agregar entrenamiento</BaseButton>
        <BaseButton v-if="showingTrainingForm" @click="cancelTrainingForm">Cancelar</BaseButton>
    </div>

    <!-- <TrainingForm v-if="showingTrainingForm" /> -->
    <div v-if="showingTrainingForm">
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
            <BaseButton class="rounded-full p-3 ml-2"
            ></BaseButton>    
        </form>  
    </div>
    </template>

    <template
    v-if="editForm">
    <form 
        action="#" 
        @submit.prevent="edit"
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
                :placeholder="training.name"
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
                :placeholder="training.img"
                required
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
                :placeholder="training.description"
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
                :placeholder="training.coach"
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
                :placeholder="training.price"
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
                :placeholder="training.difficulty"
                required
                ></BaseInput>             
            </div>
        </div>
    </section>
    </div>
        <BaseButton class="rounded-full p-3 ml-2"
        >Editar</BaseButton>    
    </form>  
    </template>

</div>

</template>