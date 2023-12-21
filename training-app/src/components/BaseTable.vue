<script setup>
import { defineProps } from 'vue'
import noImage from '../imgs/no-image.jpg'

const props = defineProps(['items'])
</script>

<template>
    <div class="container mx-auto p-4">
        <table class="max-w-full bg-white border border-gray-300 mx-auto">
            <thead>
                <tr>
                    <th class="py-2 px-8 border-b">Imagen</th>
                    <th class="py-2 px-8 border-b">Email</th>
                    <th class="py-2 px-8 border-b">
                        Entrenamientos contratados
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td class="py-2 px-8 flex justify-center items-center">
                        <img :src="item.photoURL || noImage" alt="" class="w-24" />
                    </td>
                    <td class="py-2 px-8 border-b text-center">
                        {{ item.email }}
                    </td>
                    <td class="py-2 px-8 border-b">
                        <template v-if="item.trainings && item.trainings.length > 0">
                            <ul class="list-disc">
                                <li class="font-semibold" v-for="training in item.trainings">
                                    {{ training.name }} -
                                    <span class="text-indigo-600">${{ training.price }}</span>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <p class="text-sm text-center">
                                No tiene entrenamientos contratados.
                            </p>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
