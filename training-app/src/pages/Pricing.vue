<script>
import {  getTrainings } from '../services/trainings';

export default {
    name: 'Pricing',
    data() {
        return {
            trainings: [],
        }
    },
    async mounted () {
        let trainingsAll = await getTrainings();
        let trainingDoc;
        
        console.log(trainingsAll);
        console.log(this.trainings);
        console.log(this.trainings.img);
        trainingsAll.forEach(doc => {
            trainingDoc = doc.data();
            this.trainings.push(trainingDoc);
        });
        console.log(trainingDoc);
        
        console.log(this.trainings);
        
    }
}
</script>

<template>
<section class="container p-6">
    <h1 class="text-center mb-4">Precios de nuestros planes de entrenamiento</h1>
    <div class="flex p-4 flex-wrap">
    <div class="mb-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
    v-for="training in trainings">
        <div class="">
        <div class="">
            <img class="h-72 w-full object-cover" :src="training.img" alt="Imagen de la card">
        </div>
        <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{training.name}}</a>
            <p class="mt-2 text-gray-500">{{training.description}}</p>
            <p class="mt-4 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>
        </div>
        </div>
    </div>
    </div>
</section>
</template>