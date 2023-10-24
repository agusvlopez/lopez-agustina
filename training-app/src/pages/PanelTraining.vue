<script>
import { collection, deleteDoc, doc, documentId, getDocs, query, where } from 'firebase/firestore';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { getTrainings, trainingsSaveTraining, deleteDocument, getTrainingDocs, buscarYEliminarDocumento } from '../services/trainings';
import { db } from '../services/firebase';
import Loader from '../components/Loader.vue';

export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            trainingsLoading: true,
            deletedTraining: false,
            documentId: null,
            trainings: [],
            doc: null,
            valorDeEliminacion: '',
            training: {
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
        saveTraining() {
            // if(this.newMessageSaving) return;
            // this.newMessageSaving = true;
            trainingsSaveTraining({
                name: this.training.name,
                img: this.training.img,
                description: this.training.description,
                coach: this.training.coach,
                price: this.training.price,
                difficulty: this.training.difficulty,
            })
                .then(() => {
                this.training.name = '';
                this.training.img = '',
                this.training.description = '';
                this.training.coach = '';
                this.training.price = 0;
                this.training.difficulty = '';
                // this.newMessageSaving = false;
            });
        },
        // async getDocsId(){
        //     let trainingsDocs = await getTrainings();
        //     console.log(trainingsDocs);
        //     trainingsDocs.forEach(doc => {
        //         this.trainings.push(doc);
        //         console.log(this.trainings);
        //     });
        // },
        async deleteTraining(valor) {
            this.deletedTraining = true;
            this.trainingsLoading = true; 
            buscarYEliminarDocumento(valor)
            
            let trainingsDocs = await getTrainings()
             let trainingDoc;
             let docs = [];
                trainingsDocs.forEach(doc => {
                 trainingDoc = doc.data();
                 console.log(trainingDoc.name);
                 docs.push(trainingDoc);
                 console.log(this.trainings);
             });
             this.trainings = docs; 
            console.log(trainingsDocs)
            this.deletedTraining = false;
            this.trainingsLoading = false;

        },
        
    },
    async mounted () {
       
        this.trainingsLoading = true; 
      
         console.log();
        console.log(this.trainings);
        let trainingsAll = await getTrainings();
      
        let trainingDoc;
        trainingsAll.forEach(async doc => {
            trainingDoc = doc.data();
            this.trainings.push(trainingDoc);
            
        });
        console.log(trainingsAll);
        this.trainingsLoading = false;
        // let trainingDocs = getTrainingDocs();
       
        // this.doc = await getTrainingDocs();
        
        return this.trainingDoc;
    },
    async unmounted () {
       
    }
}
</script>

<template>
<div class="container mx-auto p-4">
   <section class="border-b-2">
    <h1>Panel de entrenamientos</h1>
    <h2>Todos los entrenamientos </h2>
    <div class="flex p-4 flex-wrap">
        
    <template
    v-if="!trainingsLoading  && !deletedTraining" >
    <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden"
    v-for="training in trainings"
    :key="training.id"  
    >

    <form action="" 
            @submit.prevent="deleteTraining(training.name)"
        >
        <div class="">
        <div class="">
            <img class="h-24 w-full object-cover" :src="training.img" alt="Imagen de la card">
        </div>
        <div class="p-4">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{training.name}}</a>
            <p class="mt-1 text-gray-500">{{training.description}}</p>
            <p class="mt-1 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>

            <BaseButton 
            class="bg-red-500 hover:bg-red-600 mt-2">Eliminar</BaseButton> 
        
        </div>
        </div>
    </form>
    

        </div>  
    </template>
    <template
    v-else>
        <Loader></Loader>
    </template>
    </div>
    </section>
    
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