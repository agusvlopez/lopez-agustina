<script>
import { collection, deleteDoc, doc, documentId, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
            editLoading: false,
            trainingsLoading: true,
            deletedTraining: false,
            documentId: null,
            trainings: [],
            doc: null,
            editTraining: false,
            valorDeEliminacion: '',
            alert: false,
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
            this.trainingsLoading = true;
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
            let trainingsAll = await getTrainings();
                trainingsAll.forEach(async doc => {
                trainingDoc = doc.data();
                array.push(trainingDoc);
            console.log(this.trainings);
                });
                this.trainings = array;
           
        },

        async deleteTraining(valor) {
            this.deletedTraining = true;
            this.trainingsLoading = true; 
            buscarYEliminarDocumento(valor)
            
            let trainingsDocs = await getTrainings()
             let trainingDoc;
             let docs = [];
                trainingsDocs.forEach(async doc => {
                 trainingDoc = doc.data();
                 console.log(trainingDoc.name);
                 docs.push(trainingDoc);
                 console.log(this.trainings);
             });
             this.trainings = docs; 
            console.log(this.trainings)
            console.log(trainingDoc)

            this.editLoading = false;
            this.deletedTraining = false;
            this.trainingsLoading = false;
            this.alert = false;
            this.valorDeEliminacion = '';
        },
        async edit() {
            let trainingDocId;
            const documents = [];
            let idT;
            this.editLoading = true;
            // this.trainings.forEach((t)=>{
            //     idT = t;
            // });
            // console.log(idT);
            // this.training = idT;
            const querySnapshot = await getDocs(collection(db, 'trainings'));
            console.log(querySnapshot);
            // let trainingDocs = allTrainings.docs;

            querySnapshot.forEach(async (doc) => {
                // Aquí puedes acceder a los datos de cada documento.
                // Por ejemplo, doc.data() te proporcionará los datos del documento.
                // Puedes ajustar esta parte según tu estructura de datos real.
                    const documentData = {
                        
                        ...doc.data(), // Datos del documento
                    };
            
                    documents.push(documentData);
                });
                // const snapshot = await getDocs( 
                //     query(privateChatAdmin,
                //     where('users', '==', {
                //         [adminId]: true,
                //         [receiverId]: true,
                //     }),
                //     //cuando encuentra un documento con esos valores deje de buscar:
                //     limit(1),
                //  ));
    
          

            this.editTraining = false;
            // let newTrainingData = {
            //     name: this.newTraining.name,
            //     img: this.newTraining.img,
            //     description: this.newTraining.description,
            //     coach: this.newTraining.coach,
            //     price: this.newTraining.price,
            //     difficulty: this.newTraining.difficulty,
            // };      
            trainingDocId = querySnapshot.docs;
            console.log(trainingDocId);
            // let idsTraining = idT;
            // console.log(idsTraining);
            try {     
                await updateDoc('trainings', trainingDocId);
                this.editLoading = false;
            console.log('Documento editado con éxito: ', newTrainingData);

            } catch (error) {
                console.error('Error al editar el documento:', error);
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
            console.log(event);
            this.valorDeEliminacion = event;
            console.log(this.valorDeEliminacion);
        },
        closeAlert(){
            this.alert = false;
        }

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

        return this.trainingDoc;
    },

}
</script>

<template>
<div class="container mx-auto p-4">
   <section class="border-b-2">
    <h1>Panel de entrenamientos</h1>
    <h2>Todos los entrenamientos </h2>
   
    <div class="bg-red-100 border border-red-400 text-red-700 p-4 py-fit rounded relative max-w-fit mx-auto" role="alert"
        v-if="alert &&  !trainingsLoading  && !deletedTraining"
        >
        <p class="font-bold">¡Atención!</p>
        <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ this.valorDeEliminacion }}. </span>¿Estas seguro que queres eliminarlo?</span>
        <form action="" 
            @submit.prevent="deleteTraining(this.valorDeEliminacion)"
        >
        <div class="flex justify-center">
            <BaseButton 
                class="bg-red-500 hover:bg-red-600 mt-2">Eliminar
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
    v-if="!trainingsLoading  && !deletedTraining" >
    <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4"
    v-for="training in trainings"
    :key="training.id"  
    >
    <form action=""
    @submit.prevent="openAlert(training.name)">
        <div>
        <div>
            <img class="h-24 w-full object-cover" :src="training.img" alt="Imagen de la card">
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
           >Eliminar</BaseButton>
        </div>
        </div> 
    </form>
            <div class="flex justify-end align-middle">
                <button @click="editTrue" class="font-bold text-indigo-500 flex items-center"> Editar entrenamiento <span class="editIcon block ml-1"></span></button>
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
    v-if="!editTraining">
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
    </template>

    <template
    v-if="editTraining">
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
                v-model="newTraining.name"
                class="shadow"
                :placeholder="this.training.name"
                ></BaseInput> 
            </div>
        </div>
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="img" class="text-sm">URL de la imagen: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="img" 
                v-model="newTraining.img"
                class="shadow"
                :placeholder="training.img"
                ></BaseInput> 
            </div>
        </div>
    </section>
        <div class="m-3">
            <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
            <div class="mt-2">
                <BaseTextarea
                id="description" 
                v-model="newTraining.description"
                class="shadow"
                rows="4"
                :placeholder="training.description"
                ></BaseTextarea> 
            </div>
        </div>
    
    <section class="flex flex-wrap">
        <div class="m-3 flex-auto">
            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="coach" 
                v-model="newTraining.coach"
                class="shadow"
                :placeholder="training.coach"
                ></BaseInput>           
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
            <div class="mt-2">
                <BaseInput
                type="number"
                id="price" 
                v-model="newTraining.price"
                class="shadow"
                :placeholder="training.price"
                ></BaseInput>            
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="difficulty" 
                v-model="newTraining.difficulty"
                class="shadow"
                :placeholder="training.difficulty"
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