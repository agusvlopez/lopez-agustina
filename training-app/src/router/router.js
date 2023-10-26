import Chat from './../pages/Chat.vue';
import Home from './../pages/Home.vue';
import Login from './../pages/Login.vue';
import Pricing from './../pages/Pricing.vue';
import Register from './../pages/Register.vue';
import MyProfile from './../pages/MyProfile.vue';
import UserProfile from './../pages/UserProfile.vue';
import PrivateChat from './../pages/PrivateChat.vue';
import PanelAdmin from './../pages/PanelAdmin.vue';
import PanelClient from './../pages/PanelClient.vue';
import PanelTraining from './../pages/PanelTraining.vue';
import PanelChat from './../pages/PanelChat.vue';
import ChatClient from './../pages/ChatClient.vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import { subscribeToAuth } from '../services/auth';

//Defino la lista de rutas
const routes = [
    {path: '/',                         component: Home},
    {path: '/precios',                  component: Pricing},
    {path: '/chat',                     component: Chat,            meta: { requiresAuth: true },},   
    {path: '/iniciar-sesion',           component: Login},  
    {path: '/registro',                 component: Register},  
    {path: '/perfil',                   component: MyProfile,       meta: { requiresAuth: true },},
    {path: '/usuario/:id',              component: UserProfile,     meta: { requiresAuth: true },},  
    {path: '/usuario/:id/chat',         component: PrivateChat,     meta: { requiresAuth: true },},  
    {path: '/cliente/:id/chat',         component: ChatClient,     meta: { requiresAuth: true },}, 
    {path: '/panel-admin',              component: PanelAdmin,      meta: { requiresAuth: true },},
    {path: '/panel-admin/entrenamientos',      component: PanelTraining,      meta: { requiresAuth: true },},
    {path: '/panel-admin/chats',              component: PanelChat,      meta: { requiresAuth: true },},
    {path: '/panel-cliente',            component: PanelClient,     meta: { requiresAuth: true },},
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
    rol: 'cliente',
}
let admin = {
    id: null,
    email: null,
    rol: 'admin',
}

subscribeToAuth(newUser => user = newUser);
subscribeToAuth(newUserAdmin => admin = newUserAdmin);

//Agrego la protección de la ruta chat
router.beforeEach((to, from) => {
    if(user.id === null && admin.id === null && to.meta.requiresAuth){
        return '/iniciar-sesion';
    }
})
export default router;

