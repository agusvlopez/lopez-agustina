<script>
import Loader from '../components/Loader.vue';
import {  getTrainings } from '../services/trainings';

export default {
    name: 'Pricing',
    components: { Loader },
    data() {
        return {
            trainings: [],
            trainingsLoading: true,
        };
    },
    async mounted() {
        let trainingsAll = await getTrainings();
        let trainingDoc;
        this.trainingsLoading = true;
        trainingsAll.forEach(doc => {
            trainingDoc = doc.data();
            this.trainings.push(trainingDoc);
        });
        this.trainingsLoading = false;
    }
}
</script>

<template>
<section class="container p-6 bg-gray-200">
    <h1 class="text-center mb-4 font-bold">Precios de nuestros planes de entrenamiento</h1>
    <template v-if="!trainingsLoading">
        <div class="flex p-4 flex-wrap">
        <div class="mb-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        v-for="training in trainings">
            <div>
            <div>
                <img class="h-72 w-full object-cover" :src="training.img" :alt="training.name">
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
    </template>
    <template 
    v-else>
        <Loader></Loader>
    </template>
</section>
</template>