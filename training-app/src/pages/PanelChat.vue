<script>
import Loader from '../components/Loader.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllPrivateChatAdmin, getPrivateChatDocs, getUserChat, sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { getAllUsers, getUserProfileById } from '../services/user';
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import BaseLabel from '../components/BaseLabel.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { dateToString } from '../helpers/date';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';


export default {
    name: 'PanelChat',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            userLoading: true,
            users: [],
            usersIds: [],
            usersAdmins: [],
            clients: [],
            clientsId: [],
            user: {
                id: null,
                email: null,
                rol: null,
            },
            authUser: {
                id: null,
                email: null,
                rol: null,
            },
            unsubscribeAuth: () => {},

        };
    },
    methods: {
    },  
    async mounted() {
        let user = await getAllUsers();
        let qArray = [];
        let dataArray = [];
        let idsArray = [];

        const refUser = collection(db, 'users');

        const querySnapshot = await getDocs(refUser);

        querySnapshot.forEach((q) => {
            qArray.push(q.data());       
        });

        querySnapshot.forEach((q) => {
            idsArray.push(q);
        });
        this.clientsId = idsArray;

        qArray.forEach((q) => {
            dataArray.push(q);
        });

        this.clients = dataArray;

        let ids = [];
        let data;
        const idsDocs = await getAllUsers();
        let array = [];
        let userId = {};

        idsDocs.forEach(async (doc) => {      
            data = doc.data();
            userId = {
                id: doc.id,
                email: data.email,
                rol: data.rol
            }; 
             ids.push(userId); 
        });

        this.users = ids;

        let u = ids;
        this.usersIds.push(u);

        this.userLoading = true;
      
        this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
        this.userLoading = false;

        this.user = await getUserProfileById(userId);
        

        if(idsDocs){
            idsDocs.forEach((user) => {
            array.push(user.data());

           })
            this.usersAdmins = array;
        }
       this.users.push(this.user);
  
    },
    unmounted() {
        this.unsubscribeAuth();
    }
};
</script>

<template>  
<section class="container p-4">      
    <div> 
        <h1 class="mb-4 mt-4">Chats con clientes</h1>
    </div>
<div class="flex flex-wrap"
>
    <template
    v-for="user in this.users"
    :key="user.id"
    v-if="!this.userLoading"> 
    <div 
    v-if="user.email !== this.authUser.email">
        <div class="bg-white p-4 rounded-lg shadow m-2"> 
            <div>
                <p class="text-md font-semibold mt-4 m-2">Usuario: {{user.email}}</p>
                <p class="text-gray-600 m-2">Estado: Activo</p>

                 <router-link
                :to="`/cliente/${user.id}/chat`"
                class="m-2 transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800"
                >Ver mensajes</router-link>
            </div>
        </div>
    </div>
    </template>
    <template
    v-else>
        <Loader></Loader>
    </template>
</div>

</section>
</template>