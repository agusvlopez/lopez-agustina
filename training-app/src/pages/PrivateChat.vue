<script setup>
import { useUserProfile } from '../functions/useUserProfile';
import Loadingcontext from '../components/LoadingContext.vue';
import Chat from '../components/Chat.vue';
import { useRoute } from 'vue-router';
import BaseH1 from '../components/BaseH1.vue';

const route = useRoute();
const { user, userLoading } = useUserProfile(route.params.id);

</script>

<template>
    <div class="bg-gray-200">
        <Loadingcontext :loading="userLoading">
            <section class="container p-6 mx-auto">
                <BaseH1>Chat con <router-link :to="`/usuario/${user.id}`" class="text-indigo-600"> {{ user.email }}
                    </router-link>
                </BaseH1>
                <Chat />
            </section>
        </Loadingcontext>
    </div>
</template>