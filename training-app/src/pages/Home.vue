<script setup>
import BaseButton from '../components/BaseButton.vue'
import LoadingContext from '../components/LoadingContext.vue'
import { ref, onMounted } from 'vue'
import { getTrainings } from '../services/trainings'

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
        <div class="portada text-white py-16 text-center imgPortada ">
            <div class=" container mx-auto w-full p-6 bg-black">
                <h1 class="text-4xl font-semibold mb-4">
                    Bienvenido a Training App
                </h1>
                <p class="text-lg">
                    Lográ tus metas con nuestros planes de entrenamientos hechos
                    y supervisados por expertos.
                </p>
                <BaseButton class="inline-block px-6 py-3 mt-6">
                    <router-link to="/precios">Comenzar</router-link>
                </BaseButton>
            </div>
        </div>

        <h2 class="text-2xl font-semibold mt-4 p-4">
            Nuestros Planes de Entrenamiento
        </h2>
        <section class="container p-4 mx-auto py-6">
            <LoadingContext :loading="trainingsLoading">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <!-- Ejemplo de tarjeta de programa -->
                    <div class="bg-white shadow-md rounded p-4" v-for="training in trainings">
                        <h3 class="text-xl font-semibold mb-2 border-b-2 pb-2 border-gray-400">
                            {{ training.name }}
                        </h3>
                        <p>{{ training.description }}</p>
                    </div>
                </div>
                <div class="text-end pr-4 mt-4">
                    <router-link to="/precios" class="font-bold text-indigo-600 hover:text-indigo-700">Ver precios
                        »</router-link>
                </div>
            </LoadingContext>
        </section>
        <!-- Sección de Entrenadores -->
        <section class="bg-gray-200 py-8 p-4">
            <div class="container mx-auto">
                <h2 class="text-2xl font-semibold mb-4">
                    Nuestros Entrenadores
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div class="bg-white shadow-md rounded p-4" v-for="coach in coachs">
                        <div>
                            <img :src="coach.img" :alt="coach.name" class="h-44 w-full object-cover" />
                        </div>
                        <h3 class="text-lg font-semibold mb-2 mt-2">
                            {{ coach.name }}
                        </h3>
                        <p>Especialidad: {{ coach.specialty }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
