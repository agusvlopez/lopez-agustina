<script setup>
import SkeletonContext from '../components/SkeletonContext.vue';
import { useRoute } from 'vue-router';
import { useUserProfile } from '../functions/useUserProfile'
const route = useRoute();
const { user, userLoading } = useUserProfile(route.params.id);

</script>

<template>
    <SkeletonContext :loading="userLoading">
        <div>
            <h1>Perfil de {{ user.email }}</h1>
            
            <UserProfileData :user="user" />

            <h2>Conversación privada</h2>
            <router-link
            :to="`/usuario/${user.id}/chat`"
            class="transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800"
            >Iniciar una conversación privada con {{ user.email }}</router-link>
        </div>
    </SkeletonContext>  
</template>