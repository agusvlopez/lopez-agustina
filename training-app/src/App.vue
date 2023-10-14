<script>
import Chat from './pages/Chat.vue';
import { subscribeToAuth, logout } from './services/auth.js';

export default {
    name: "App",
    components: {Chat},
    data() {
        return {
            user: {
                id: null,
                email: null
            }
        }
    },
    methods:  {
        handleLogout(){
           logout();
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = {...user};
        });

    }
};

</script>

<template>
    <header class="flex gap-8 items-center p-4 bgNav">
        <div>
            <router-link to="/"><img src="./imgs/logo-blanco.png" alt="Logo Training App" class="maxWidth"> </router-link>
        </div>
        <nav>
            <ul class="flex gap-4 text-white">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/precios">Precios de los planes</router-link>
                </li>


            <template
            v-if="user.id === null"
            >
                <li>
                    <router-link to="/registro">Registrarse</router-link>
                </li>
                <li>
                    <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
                </li>
            </template>

            <template
            v-else
            >
                <li>
                    <router-link to="/chat">Chat</router-link>
                </li>
                <li>
                    <router-link to="/perfil">Mi perfil</router-link>
                </li>
                <li>
                <form action=""
                @submit.prevent="handleLogout">
                    <button type="submit">{{user.email}} (Cerrar sesión)</button>
                </form>
                </li>
            </template>

            </ul>
        </nav>
    </header>

    <div class="h-full">
        <!-- <Chat></Chat> -->
        <router-view></router-view>     
      
    </div>
    
    <footer class="flex justify-center items-center h-[100px] bgNav text-white">
        <p>Training App &copy; 2023</p>
    </footer>
</template>