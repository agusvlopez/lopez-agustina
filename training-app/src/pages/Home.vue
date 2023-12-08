<script >
import BaseButton from '../components/BaseButton.vue';
import Loader from '../components/Loader.vue';
import { getTrainings } from '../services/trainings';

export default {
    name: 'Home',
    components: { BaseButton, Loader },
    data() {
        return {
            trainingsLoading: true,
            trainings: [],
            coachs: [
                {   
                    id: 1,
                    img: "https://i.postimg.cc/GmQCN8vH/jillian-michaels.jpg",
                    name: "Jillian Michaels", 
                    specialty: "Entrenamiento de fuerza"
                },
                {   
                    id: 2,
                    img: "https://i.postimg.cc/KvsqYtB6/kayla-itsines.jpg",
                    name: "Kayla Itsines", 
                    specialty: "Funcional"
                },
                {   
                    id: 3,
                    img: "https://i.postimg.cc/tChQZSRK/ashley-borden.jpg",
                    name: "Ashley Borden", 
                    specialty: "Estiramiento y Yoga"
                },
                {   
                    id: 4,
                    img: "https://i.postimg.cc/KcMCwqT1/chris-powell.jpg",
                    name: "Chris Powell", 
                    specialty: "Entrenamiento de fuerza"
                },
            ],
        }  
    },

    async mounted () {
       
       this.trainingsLoading = true; 

       let trainingsAll = await getTrainings();
     
       let trainingDoc;
        let contador = 0; 
        
        trainingsAll.forEach(async doc => {
           if (contador < 3) {
            // Realiza alguna acción con el elemento
            console.log(doc);
            trainingDoc = doc.data();
            this.trainings.push(trainingDoc);
            contador++; // Incrementa el contador  
            }
        })
           
       console.log(trainingsAll);
       this.trainingsLoading = false;
       console.log(this.trainings);
       return this.trainingDoc;
   },

}
</script>

<template>
<div>
    <h1 class="hidden">Home</h1>
    <div class="portada text-white py-16 text-center imgPortada">
        <div class="container mx-auto w-3/4 p-4 bg-black rounded ">
            <h1 class="text-4xl font-semibold mb-4">Bienvenido a Training App</h1>
            <p class="text-lg">Lográ tus metas con nuestros planes de entrenamientos hechos y supervisados por expertos.</p>
            <BaseButton
           class="inline-block px-6 py-3 mt-6"> <router-link to="/precios">Comenzar</router-link></BaseButton> 
        </div>
    </div>
    
    <h2 class="text-2xl font-semibold mt-4 p-4">Nuestros Planes de Entrenamiento</h2>
    <template 
    v-if="!trainingsLoading">
    <section class="container p-4 mx-auto py-10" >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Ejemplo de tarjeta de programa -->
            <div class="bg-white shadow-md rounded p-4" v-for="training in trainings">
                <h3 class="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-400">{{ training.name }}</h3>
                <p>{{ training.description }}</p>            
            </div>   
        </div>
    </section> 
    </template>
    <template v-else>
        <section class="container mx-auto py-12">
            <Loader></Loader>
        </section>
    </template>
    <div class="text-end pr-4 pb-2 mb-4">
        <router-link to="/precios" class="font-bold text-indigo-600 hover:text-indigo-700">Ver precios »</router-link>
    </div>
    <!-- Sección de Entrenadores -->
    <section class="bg-gray-200 py-12 p-4">
        <div class="container mx-auto">
            <h2 class="text-2xl font-semibold mb-4">Nuestros Entrenadores</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div class="bg-white shadow-md rounded p-4"
                v-for="coach in coachs">
                    <div>
                        <img :src="coach.img" :alt="coach.name" class="h-44 w-full object-cover" >
                    </div>
                    <h3 class="text-lg font-semibold mb-2 mt-2">{{ coach.name }}</h3>
                    <p>Especialidad: {{ coach.specialty }}</p>
                </div>         
            </div>
        </div>
    </section>
</div>
</template>