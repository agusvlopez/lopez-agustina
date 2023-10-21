<script>
import BaseButton from '../components/BaseButton.vue';


export default {
    name: 'Home',
    components: { BaseButton },

}
</script>

<template>
    <h1 class="hidden">Home</h1>
    <div class="portada text-white py-16 text-center imgPortada ">
        <div class="container mx-auto w-3/4 p-4 bg-black rounded ">
            <h1 class="text-4xl font-semibold mb-4">Bienvenido a Training App</h1>
            <p class="text-lg">Lográ tus metas con nuestros planes de entrenamientos hechos y supervisados por expertos.</p>
            <BaseButton
           class="inline-block px-6 py-3 mt-6"> <router-link to="/precios">Comenzar</router-link></BaseButton> 
        </div>
    </div>

    <!-- Sección de Programas -->
    <section class="container mx-auto py-12">
        <h2 class="text-2xl font-semibold mb-4">Nuestros Programas de Entrenamiento destacados</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Ejemplo de tarjeta de programa -->
            <div class="bg-white shadow-md rounded p-4">
                <h3 class="text-xl font-semibold mb-2">Programa 1</h3>
                <p>Descripción del programa...</p>
            </div>
            <!-- Puedes agregar más tarjetas de programas aquí -->
        </div>
    </section>

    <!-- Sección de Entrenadores -->
    <section class="bg-gray-200 py-12">
        <div class="container mx-auto">
            <h2 class="text-2xl font-semibold mb-4">Nuestros Entrenadores</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <!-- Ejemplo de tarjeta de entrenador -->
                <div class="bg-white shadow-md rounded p-4">
                    <h3 class="text-lg font-semibold mb-2">Nombre del Entrenador</h3>
                    <p>Especialidad: Entrenamiento de fuerza</p>
                </div>
                <!-- Puedes agregar más tarjetas de entrenadores aquí -->
            </div>
        </div>
    </section>

</template>