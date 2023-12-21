<script setup>
import SkeletonContext from '../components/SkeletonContext.vue';
import { useRoute } from 'vue-router';
import { useUserProfile } from '../functions/useUserProfile'
import BaseH1 from '../components/BaseH1.vue';
import Userprofiledata from '../components/UserProfileData.vue';
const route = useRoute();
const { user, userLoading } = useUserProfile(route.params.id);

</script>

<template>
    <SkeletonContext :loading="userLoading">
        <div class="p-4">
            <BaseH1>Perfil de {{ user.email }}</BaseH1>
            <Userprofiledata :user="user" />
        </div>
    </SkeletonContext>  
</template>