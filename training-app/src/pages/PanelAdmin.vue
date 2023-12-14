<script>
import CardRadio from '../components/CardRadio.vue';

export default {
    name: 'PanelAdmin',
    components: { CardRadio }
}
</script>

<template>
    <div class="container mx-auto p-4">
            <h1 class="font-bold text-center">Panel del Administrador/a</h1>  
        <div>
            <p class="mb-3 font-semibold"></p>
            <div class="flex justify-center gap-3 mb-8">
                <CardRadio> 
                <router-link to="/panel-admin/entrenamientos">Configuración de entrenamientos</router-link>   
                </CardRadio>
                <CardRadio><router-link to="/panel-admin/chats">Mensajes/Chats</router-link></CardRadio>
                <CardRadio><router-link to="/panel-admin/plans">Usuarios y planes contratados</router-link></CardRadio>
            </div>
        </div> 
    </div>  
</template>