<script setup>
import BaseButton from '../components/BaseButton.vue'
import LoadingContext from '../components/LoadingContext.vue'
import { ref, onMounted } from 'vue'
import { getTrainings } from '../services/trainings'
import workoutIcon from '../imgs/workout-icon.png';
import homeIcon from '../imgs/home-training-icon.png';
import loveIcon from '../imgs/love-gym-icon.png';

const trainingsLoading = ref(true)
const trainings = ref([])
const coachs = ref([
    {
        id: 1,
        img: 'https://i.postimg.cc/GmQCN8vH/jillian-michaels.jpg',
        name: 'Jillian Michaels',
        specialty: 'Entrenamiento de fuerza',
    },
    {
        id: 2,
        img: 'https://i.postimg.cc/KvsqYtB6/kayla-itsines.jpg',
        name: 'Kayla Itsines',
        specialty: 'Funcional',
    },
    {
        id: 3,
        img: 'https://i.postimg.cc/tChQZSRK/ashley-borden.jpg',
        name: 'Ashley Borden',
        specialty: 'Estiramiento y Yoga',
    },
    {
        id: 4,
        img: 'https://i.postimg.cc/KcMCwqT1/chris-powell.jpg',
        name: 'Chris Powell',
        specialty: 'Entrenamiento de fuerza',
    },
])

onMounted(async () => {
    try {
        trainingsLoading.value = true
        const trainingsAll = await getTrainings()

        let contador = 0
        trainingsAll.forEach((doc) => {
            if (contador < 3) {
                console.log(doc)
                trainings.value.push(doc)
                contador++
            }
        })

        trainingsLoading.value = false
    } catch (error) {
        console.error('Error:', error)
    }
})
</script>

<template>
    <div>
        <div class="portada text-white py-28 p-4 imgPortada">
            <div class="p-6 bg-black w-fit rounded-lg">
                <h1 class="text-4xl font-bold mb-4 uppercase">
                    Bienvenido a Training App
                </h1>
                <p class="text-lg">
                    Lográ tus metas con nuestros planes de entrenamientos <span class="block">hechos
                        y supervisados por expertos.</span>
                </p>
                <BaseButton class="inline-block px-6 py-3 mt-6">
                    <router-link to="/precios">Comenzar</router-link>
                </BaseButton>
            </div>
        </div>
        <div class="backgroundDark pt-16">
            <section class="container p-4 mx-auto py-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div class="backgroundDark text-white shadow-md rounded-xl p-8 text-lg border-2 border-indigo-700">
                        <img :src="workoutIcon" alt="" class="w-16">
                        <h2 class="text-2xl mt-2 font-semibold text-indigo-600">
                            Entrenadores calificados/as
                        </h2>
                        <p>Entrená con confianza con la guía de nuestros habilidosos y reconocidos instructores. </p>
                    </div>
                    <div class="backgroundDark text-white shadow-md rounded-xl p-8 text-lg border-2 border-indigo-700">
                        <img :src="homeIcon" alt="" class="w-16">
                        <h2 class="text-2xl mt-2 font-semibold text-indigo-600">
                            Entrenamientos en donde sea
                        </h2>
                        <p>Entrená desde tu casa o en donde quieras con nuestros entrenamientos. </p>
                    </div>
                    <div class="backgroundDark text-white shadow-md rounded-xl p-8 text-lg border-2 border-indigo-700">
                        <img :src="loveIcon" alt="" class="w-16">
                        <h2 class="text-2xl mt-2 font-semibold text-indigo-600">
                            Servicios especiales
                        </h2>
                        <p>Experimentá los servicios personalizados adaptados a tus necesidades.</p>
                    </div>
                </div>
            </section>
        </div>
        <div class="backgroundDark pt-16">
            <h2 class="text-indigo-700 text-center uppercase font-bold text-lg">Elegí tu plan</h2>
            <h3 class="text-3xl font-bold pb-4 text-center text-white">
                Nuestros Planes de Entrenamiento
            </h3>
            <section class="container p-4 mx-auto py-6">
                <LoadingContext :loading="trainingsLoading">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div class="backgroundDark text-white shadow-md rounded-xl text-lg" v-for="training in trainings">
                            <div class="bg-indigo-900 rounded-t-xl">
                                <img :src="training.img" alt="" class="rounded-t-xl opacity-80">
                            </div>
                            <div class="p-6">
                                <div>
                                    <span
                                        class="uppercase bg-indigo-900 p-2 pl-4 pr-4 rounded-full text-xs font-semibold">dificultad
                                        {{ training.difficulty }}</span>
                                </div>
                                <h3 class="text-xl font-semibold mb-2 border-b-2 pb-2 mt-4 ml-1 mr-1 border-indigo-700">
                                    {{ training.name }}
                                </h3>
                                <p class="ml-1 mr-1">{{ training.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-end pr-4 mt-4 text-xl">
                        <router-link to="/precios" class="font-bold text-white hover:text-indigo-200">Ver precios
                            »</router-link>
                    </div>
                </LoadingContext>
            </section>
        </div>
        <!-- Sección de Entrenadores -->
        <section class="backgroundDark py-8 pt-16">
            <div class="container mx-auto">
                <h2 class="text-indigo-700 text-center uppercase font-bold text-lg">Entrená con expertos</h2>
                <h3 class="text-3xl font-bold pb-4 text-center text-white">
                    Nuestros Entrenadores
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div class="transparent text-white   rounded p-4" v-for="coach in coachs">
                        <div>
                            <img :src="coach.img" alt="" class="h-72 w-full object-cover rounded shadow" />
                        </div>
                        <h3 class="text-lg font-semibold mb-2 mt-2 uppercase">
                            {{ coach.name }}
                        </h3>
                        <p>Especialidad: {{ coach.specialty }}</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Sección de Newsletter -->
        <section class="backgroundDark pt-16 ">
            <div class="bg-indigo-900 portada text-white py-20 p-4 imgNewsletter">
                <div class="w-full p-6">
                    <h2 class="text-4xl font-bold mb-4 uppercase text-center">
                        Suscribite a nuestro Newsletter
                    </h2>
                    <p class="text-xl font-semibold text-center">
                        Recibí todas las novedades y descuentos disponibles
                    </p>
                    <BaseButton class="block px-6 py-3 mt-6 mx-auto shadow-xl">
                        <router-link to="/">Suscribirme</router-link>
                    </BaseButton>
                </div>
            </div>
        </section>
    </div>
</template>
