<!-- <script>
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { getUserProfileById } from '../services/user';


    export default {
    name: 'UserProfile', 
    components: { SkeletonLoader },
    data() {
        return {
            //Aca probar el skeleton loader
            userLoading: true,
            users: [],
            user: {
                id: null,
                email: null,
                rol: null,
            }
        };
    },
    async mounted() {
        this.userLoading = true;
        console.log(this.userLoading);
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoading = false;
        this.users.push(this.user);
        
    },
   
}

</script> -->
<!-- CHEQUEAR SI HACE FALTA QUE EXISTA ESTE COMPONENTE -->
<script setup>
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { useRoute } from 'vue-router';
import { useUserProfile } from '../functions/useUserProfile'
const route = useRoute();
const { user, userLoading } = useUserProfile(route.params.id);


</script>

<template>
    <SkeletonLoader v-if="userLoading"></SkeletonLoader>
    <template v-else>
        <div>
        <h1>Perfil de {{ user.email }}</h1>
        
        <h2>Conversación privada</h2>
        <router-link
        :to="`/usuario/${user.id}/chat`"
        class="transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800"
        >Iniciar una conversación privada con {{ user.email }}</router-link>
    </div>
    </template>

    
</template>