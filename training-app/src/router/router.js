import Chat from './../pages/Chat.vue';
import Home from './../pages/Home.vue';
import Login from './../pages/Login.vue';
import Pricing from './../pages/Pricing.vue';
import Register from './../pages/Register.vue';
import Profile from './../pages/Profile.vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import { subscribeToAuth } from '../services/auth';

//Defino la lista de rutas
const routes = [
    {path: '/', component: Home},
    {path: '/precios', component: Pricing},
    {path: '/chat', component: Chat,   meta: { requiresAuth: true },},   
    {path: '/iniciar-sesion', component: Login},  
    {path: '/registro', component: Register},  
    {path: '/perfil', component: Profile,   meta: { requiresAuth: true },},  
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
}

subscribeToAuth(newUser => user = newUser);

//Agrego la protección de la ruta chat
router.beforeEach((to, from) => {
    if(user.id === null && to.meta.requiresAuth){
        return '/iniciar-sesion';
    }
})
export default router;

