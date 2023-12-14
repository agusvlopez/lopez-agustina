<script>
import Loader from '../components/Loader.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllUsers, getUserProfileById } from '../services/user';
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import BaseLabel from '../components/BaseLabel.vue';
import ChatInput from '../components/ChatInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProfileImage from '../components/ProfileImage.vue';
import BaseH1 from '../components/BaseH1.vue';

export default {
    name: 'PanelChat',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader, ProfileImage, BaseH1 },
    data() {
        return {
            userLoading: true,
            users: [],
            usersIds: [],
            usersAdmins: [],
            nonAdminUsers: [],
            clients: [],
            clientsId: [],
            user: {
                id: null,
                email: null,
                rol: null,
                photoURL: null,
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
        console.log(idsDocs);
        let array = [];
        let userId = {};

        idsDocs.forEach(async (doc) => {      
            data = doc.data();
            userId = {
                id: doc.id,
                email: data.email,
                rol: data.rol,
                photoURL: data.photoURL
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
  
        // Filtrar usuarios que no son administradores
        this.nonAdminUsers = this.users.filter(user => user.rol == 'cliente');
    },
    unmounted() {
        this.unsubscribeAuth();
    }
};
</script>

<template>
    <section class="container p-4">
        <div>
            <BaseH1>Chats con clientes</BaseH1>
        </div>
        <div class="flex flex-wrap">
            <template v-for="user in nonAdminUsers" :key="user.id" v-if="!this.userLoading">
                <div v-if="user.rol != 'admin'">
                    <div class="bg-white p-4 rounded-lg shadow m-2">
                        <div>
                            <ProfileImage
                              :src="user.photoURL"
                              class="pb-4 w-60"
                            />
                            <p class="text-md font-semibold mt-4 m-2">Usuario: {{ user.email }}</p>
                            <p class="text-gray-600 m-2">Estado: Activo</p>
                            <router-link
                              :to="`/usuario/${user.id}/chat`"
                              class="m-2 transition motion-reduce:transition-none text-indigo-600 font-bold hover:text-indigo-800"
                            >Ver mensajes</router-link>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="userLoading">
                <Loader></Loader>
            </template>
        </div>
    </section>
</template>