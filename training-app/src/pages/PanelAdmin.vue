<script setup>
import BaseH1 from '../components/BaseH1.vue';
import CardRadio from '../components/CardRadio.vue';

</script>

<template>
    <div class="container mx-auto p-4">
        <BaseH1 class="text-white">Administración</BaseH1>
        <div class="mt-6">
            <p class="mb-3 font-semibold"></p>
            <div class="flex justify-center gap-3 mb-8">
                <router-link to="/panel-admin/entrenamientos">
                    <CardRadio>
                        Configuración de entrenamientos
                    </CardRadio>
                </router-link>
                <router-link to="/panel-admin/chats">
                    <CardRadio>
                        Mensajes/Chats
                    </CardRadio>
                </router-link>
                <router-link to="/panel-admin/plans">
                    <CardRadio>
                        Usuarios y planes contratados
                    </CardRadio>
                </router-link>
            </div>
        </div>
    </div>
</template>