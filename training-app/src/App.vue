<!-- <script setup>
import { useRouter } from 'vue-router';
import Loader from './components/Loader.vue';
import { logout } from './services/auth.js';
import { useAuth } from './functions/useAuth';

const { handleLogout } = useLogout();
const { user, registerLoading } = useAuth();

function useLogout() {
    const router = useRouter();
    
    const handleLogout = () => {
        logout();
        router.push('/iniciar-sesion');
    }

    return {
        handleLogout,
    }
}
</script> -->
<script setup>
import { onMounted, provide, reactive, readonly, ref } from 'vue';
import Loader from './components/Loader.vue';
import { subscribeToAuth, logout } from './services/auth.js';
import { getUserProfileById } from './services/user.js';
import { useRouter } from 'vue-router';
import { useAuth } from './functions/useAuth';
import { notificationKey } from './symbols/symbols';
import Notification from './components/Notification.vue';

const mobileMenuOpen = ref(false);
const { user } = useAuth();
const router = useRouter();

const notification = ref({
    message: null,
    type: 'success'
});

function setNotification(data) {
    notification.value = data;
}
//Defino qué quiere proveer App
provide(notificationKey, {
    notification: readonly(notification),
    setNotification,
});

const handleLogout = () => {
  logout();
  router.push('/iniciar-sesion');
  
};

</script>

<template>
<header>
    <nav class="bg-black shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link to="/"><img src="./imgs/logo-blanco.png" alt="Logo Training App" class="maxWidth"></router-link>
        <div class="hidden md:flex space-x-4">
            <ul class="flex gap-4 text-white">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/precios">Precios de los planes</router-link>
                </li>

            <template
            v-if="user.id == null"
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
            <template
            v-if="user.rol === 'cliente' && user.fullProfileLoaded">
                <li>
                    <router-link to="/usuario/d6dfuuXe7laEyCh33M0uxKtb9xk1/chat">Chateá con nosotros</router-link>
                </li>
            </template>
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
            <template
             v-if="user.rol === 'admin' && user.fullProfileLoaded" 
            >
                <li>
                    <router-link
                    to="/panel-admin">Panel Admin</router-link>
                </li>
            </template>
            <template v-if="user.id !== null &&!user.fullProfileLoaded">
                <Loader></Loader>
            </template>
            </ul>

        </div>
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <router-link to="/" class="block text-white p-3 hover:bg-gray-600">Home</router-link>
      <router-link to="/precios" class="block text-white p-3 hover:bg-gray-600">Precios de planes</router-link>
      <template
        v-if="user.id == null"
        >
        <router-link to="/registro" class="block text-white p-3 hover:bg-gray-600">Registrarse</router-link>
        <router-link to="/iniciar-sesion" class="block text-white p-2 hover:bg-gray-600">Iniciar sesión</router-link>
      </template>
        <template
        v-else
        >
        <template
            v-if="user.rol === 'cliente'">
            <router-link to="/usuario/d6dfuuXe7laEyCh33M0uxKtb9xk1/chat" class="block text-white p-3 hover:bg-gray-600">Chateá con nosotros</router-link>
        </template>
            <router-link to="/perfil" class="block text-white p-3 hover:bg-gray-600">Mi perfil</router-link>
             <form 
             class="block text-white p-3 hover:bg-gray-600"
             action=""
                @submit.prevent="handleLogout">
                    <button type="submit">{{user.email}} (Cerrar sesión)</button>
                </form>
        </template>
        <template
        v-if="user.rol === 'admin' && user.fullProfileLoaded" 
        >
            <router-link to="/panel-admin" class="block text-white p-3 hover:bg-gray-600">Panel Admin</router-link>
        </template>
        <template v-if="!user.fullProfileLoaded">
                <Loader></Loader>
        </template>
    </div>
  </nav>
</header>
<main>
    <div class="container h-full m-auto p-4">
        <Notification :message="notification.message" :type="notification.type" />
        <router-view></router-view>
    </div>
</main>
    <footer class="flex justify-center items-center h-[100px] bgNav text-white">
        <p>Training App &copy; 2023</p>
    </footer>
</template>