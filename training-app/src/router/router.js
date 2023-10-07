import Chat from './../pages/Chat.vue';
import Home from './../pages/Home.vue';
import Login from './../pages/Login.vue';
import Pricing from './../pages/Pricing.vue';
import Register from './../pages/Register.vue';
import {createRouter, createWebHashHistory} from 'vue-router';

//Defino la lista de rutas

const routes = [
    {path: '/', component: Home},
    {path: '/precios', component: Pricing},
    {path: '/chat', component: Chat},   
    {path: '/iniciar-sesion', component: Login},  
    {path: '/registro', component: Register},  
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;

