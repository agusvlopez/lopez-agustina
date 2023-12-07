<!-- <script>
import { collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { subscribeToAuth } from "../services/auth";
import { getPrivateChatDoc, subscribeToPrivateChat } from '../services/private-chat';
import { getUserProfileById } from "../services/user";
import { db } from "../services/firebase";
import { dateToString } from "../helpers/date";
import Loader from "../components/Loader.vue";
import ChatInput from "../components/ChatInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import CardRadio from "../components/CardRadio.vue";

    export default {
    name: 'MyProfile',
    components: { Loader, ChatInput, BaseButton, BaseLabel, BaseInput, CardRadio },
    data() {
        return {
            userLoading: true,
            rolLoading: true,
            users: [],
            usersIds: [],
            usersAdmins: [],
            newRol: '',
            editRol: false,
            user: {
                id: 'd6dfuuXe7laEyCh33M0uxKtb9xk1',
                email: 'admin@admin.com',
                rol: 'admin'
            },
            authUser: {
                id: null,
                email: null,
                rol: null,
            },
            unsubscribeAuth: () => { },
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
            unsubscribeMessages: () => { },
        };
    },
    methods: {
        handleSendMessage() {
            sendPrivateChatMessage({
                senderId: this.authUser.id,
                receiverId: this.user.id,
                message: this.newMessage.message
            });
            this.newMessage.message = '';
        },
        formatDate(data) {
            return dateToString(data);
        },
        async edit() {  
            const documentoRef = doc(db, 'users', this.authUser.id);
            this.authUser.rol = this.newRol;
            this.editRol = false;
            let newRolUser = {rol: this.authUser.rol}

            try {   
                await updateDoc(documentoRef, newRolUser);
                this.rolLoading = false;
                console.log('Documento editado con éxito');
            } catch (error) {
                console.error('Error al editar el documento:', error);
            } 
        },
        editTrue() { 
            this.editRol = true;
        },
        editFalse() {
            this.rolLoading = false;
            this.editRol = false;
        },
    },

    async mounted() {
       
        subscribeToAuth(async (user) => {
            this.rolLoading = true;
            this.authUser = { ...user };
            if (this.user.id) {
                this.registerLoading = true;
            }

            this.userLoading = true;

            this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
            this.userLoading = false;
            this.unsubscribeMessages = await subscribeToPrivateChat({
                senderId: this.authUser.id,
                receiverId: this.user.id
            }, (newMessages) => this.messages = newMessages);
            this.messagesLoading = false;

            let usuarioDocument = await getUserProfileById(this.authUser.id);
            this.authUser.rol = usuarioDocument.rol;
            
            this.rolLoading = false;
        });
       
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
}

</script> -->
<script setup>
import { useAuth } from '../functions/useAuth';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { editProfile, editProfilePhoto } from '../services/auth';
import { inject, ref } from 'vue';
import Loader from '../components/Loader.vue';
import UserProfileData from '../components/UserProfileData.vue';
import { notificationKey } from '../symbols/symbols';

const { setNotification } = inject(notificationKey);

const { user } = useAuth();
const {
    editing,
    editingLoading,
    editData,
    handleEditShow,
    handleEditCancel,
    handleEditForm
} = useProfileEdit(user);

const {
    editingPhoto,
    editingPhotoLoading,
    photoData,
    handlePhotoFormShow,
    handlePhotoFormCancel,
    handlePhotoFormSubmit,
    handlePhotoFileChange
} = usePhotoEdit();

function useProfileEdit(user) {
    const editing = ref(false);
    const editingLoading = ref(false);
    const editData = ref({
        displayName: '',
        trainings: []
    });

    const handleEditShow = () => {
        editData.value.displayName = user.value.displayName;
        editData.value.trainings = user.value.trainings;
        editing.value = true;
    }
    const handleEditCancel = () => editing.value = false;
    const handleEditForm = async () => {
        try {
            editingLoading.value = true;
            await editProfile({
                displayName: editData.value.displayName,
                trainings: editData.value.trainings,
            });

            setNotification({
                message: 'Se editó correctamente la información de tu perfil.',
                type: 'success'
            });
        } catch (error) {
            console.log("error: ", error);
            //Notificación de error          
            setNotification({
                message: error,
                type: 'error'
            });
        }
        editingLoading.value = false;
    }

    return {
        editing,
        editingLoading,
        editData,
        handleEditShow,
        handleEditCancel,
        handleEditForm
    }
}

function usePhotoEdit() {
    const editingPhoto = ref(false);
    const editingPhotoLoading = ref(false);
    const photoData = ref({
        file: null,
        preview: null,
    });

    const handlePhotoFormShow = () => editingPhoto.value = true;

    const handlePhotoFormCancel = () => editingPhoto.value = false;

    const handlePhotoFormSubmit = async () => {
        editingPhotoLoading.value = true;

        try {
            await editProfilePhoto(photoData.value.file);
        } catch (error) {
            //TODO
            console.error(error);
        }
        editingPhotoLoading.value = false;
    }

    const handlePhotoFileChange = event => {
        console.log("evento: ", event);
        photoData.value.file = event.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', function() {
            photoData.value.preview = reader.result;
            console.log(reader.result);
        });

        reader.readAsDataURL(photoData.value.file);
    }

    return {
        editingPhoto,
        editingPhotoLoading,
        photoData,
        handlePhotoFormShow,
        handlePhotoFormCancel,
        handlePhotoFormSubmit,
        handlePhotoFileChange
    }
}

</script>
<template>
<h1 class="font-bold text-center">Mi perfil</h1>
<template v-if="user.fullProfileLoaded">
    <template v-if="!editing && !editingPhoto">
        <section class="container p-4">
            <UserProfileData :user="user" />
            <div class="flex gap-2">
            <BaseButton
            @click="handleEditShow"
            >Editar mis datos</BaseButton>

            <BaseButton
            @click="handlePhotoFormShow"
            >Editar mi foto de perfil</BaseButton>
        </div>
        </section>   
    </template>
    <template v-else-if="editing">
        <form 
            action="#"
            method="post"
            @submit.prevent="handleEditForm"
        >
            <div class="mb-2">
                <BaseLabel for="displayName">Nombre de Usuario</BaseLabel>
                <BaseInput
                    id="displayName"
                    :disabled="editingLoading"
                    v-model="editData.displayName"
                />
            </div>
            <div class="mb-2">
                <BaseLabel for="trainings">Entrenamientos</BaseLabel>
                <BaseInput
                    id="trainings"
                    :disabled="editingLoading"
                    v-model="editData.trainings"
                />
            </div>
            <BaseButton
                class="mb-4"
                :loading="editingLoading"
            >Actualizar mis Datos</BaseButton>
        </form>
        <BaseButton
            @click="handleEditCancel"
        >Cancelar</BaseButton>

    </template>
    <template v-else>
        <form action="#"
        method="post"
        @submit.prevent="handlePhotoFormSubmit"
        >
        <div class="mb-2">
                    <BaseLabel for="newPhoto">Imagen de Perfil</BaseLabel>

                    <input 
                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
                        type="file"
                        id="newPhoto"
                        :disabled="editingPhotoLoading"
                        @change="handlePhotoFileChange"
                    />
                </div>
                <div 
                    class="mb-2"
                    v-if="photoData.preview !== null"
                >
                    <p>Previsualización de la imagen seleccionada</p>
                    <img :src="photoData.preview" alt="">
                </div>

                <BaseButton
                    class="mb-4"
                    :loading="editingPhotoLoading"
                >Actualizar mi Imagen de Perfil</BaseButton>

                <hr class="mb-4">

                <BaseButton
                    @click="handlePhotoFormCancel"
                >Cancelar</BaseButton>
        
        </form>
    </template>
    </template>
    <template v-else>
        <Loader />
    </template>
</template>
<!-- <template>
   <section class="container p-4">
       <Loader v-if="userLoading"></Loader>
       <template v-else>
        <h1 class="font-bold text-center">Mi perfil</h1>
        <div class="flex gap-3 justify-between p-3">

        <section>
        <h2 class="text-xl font-bolder">Administrar mis datos</h2>
       
        <div class="max-w-md overflow-hidden shadow-lg bg-white mt-4 rounded-md">
        <div class="px-6 py-4 flex">
            <div class="userIcon mr-4">
                <img src="../imgs/user.png" alt="Icono de usuario" class="w-full">
            </div>
            <div>            
            <p class="text-lg mb-2"><span class="font-bold">Email:</span> {{ authUser.email }}</p>
            <p class="text-lg mb-2"><span class="font-bold">Nombre:</span> {{ authUser.displayName || "No especificado" }}</p>
            <p class="text-lg mb-2"><span class="font-bold">Entrenamientos contratados:</span> {{ authUser.trainings || "No hay entrenamientos contratados." }}</p>

            <div class="flex justify-end align-middle">
                <button @click="editTrue" class="font-bold text-indigo-500 flex items-center"> Editar <span class="editIcon block ml-1"></span></button>
            </div>
            </div>
        </div>
        <div class="p-2" v-if="editRol">
            <form 
                    action="#"
                    @submit.prevent="edit"
                    >
                    <div class="bg-gray-200 max-w-fit mt-2 mb-6 p-3 rounded-md shadow-sm mx-auto">
                        <div class="flex justify-end font-bold">
                            <button @click="editFalse"><p class="closeButton"></p></button>
                        </div>
                    <p class="mb-3 font-semibold">Elegí tu nuevo rol:</p>
                        <div class="flex gap-1 mb-8">
                            <label v-if="authUser.rol == 'cliente'"  class="cursor-pointer" for="admin">
                                <input type="radio" class="peer sr-only" id="admin" value="admin" v-model="newRol" />
                                <CardRadio class="text-sm mr-1">Administrador/a</CardRadio>
                            </label>
                            <label v-if="authUser.rol == 'admin'" class="cursor-pointer" for="cliente">
                                <input type="radio" class="peer sr-only" id="cliente" value="cliente" v-model="newRol" />
                                <CardRadio class="text-sm">Cliente</CardRadio>
                            </label>
                            <BaseButton
                            class="text-sm"
                            >Editar</BaseButton>
                        </div>
                    </div>
                    </form>
        </div>
        </div>
        </section>

        <section v-if="authUser.rol == 'cliente'">
        <h2 class="text-xl font-bolder">Mis mensajes</h2>
        <p class="mt-2 font-bold text-indigo-600 hover:text-indigo-700"> <router-link to="/usuario/d6dfuuXe7laEyCh33M0uxKtb9xk1/chat">Ir a la conversación »</router-link> </p>
        <div class="bg-white rounded-lg shadow-md max-w-sm mx-auto m-4">
           <div> 
               <h2 class="bg-indigo-500 text-white p-3 rounded-t-lg mb-4">Conversación con {{user.email}}</h2>
   
           </div>
         
           <div class="mb-6 p-4">
               <Loader v-if="messagesLoading"></Loader>
               <template v-else>
               <div 
               class="flex mb-2"
               v-for="message in messages"
               :key="message.id"
               :class="{
                       'justify-end': message.senderId === authUser.id,
                   }"
               >
                   <div 
                   class= "rounded-lg p-2"
                   :class="{
                       'bg-gray-200': message.senderId !== authUser.id,
                       'text-gray-700': message.senderId !== authUser.id,
                       'bg-indigo-500': message.senderId === authUser.id, 
                       'text-white':  message.senderId === authUser.id,
                   }"
                   >
                       {{ message.message }}
                       <div class="text-right">{{ formatDate(message.created_at) || "Enviando..." }}</div>
                   </div>
               </div>
               </template>
           
           </div>           
               <h2 class="sr-only">Enviar mensaje</h2>
               <form action=""
               @submit.prevent="handleSendMessage"
               class="col-8"
               >
               <div class="mb-2 mt-3 p-4">
                   <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
                   <div class="flex items-center mt-2">
                       <ChatInput type="text" 
                       id="message"
                       v-model="newMessage.message"
                       class="shadow"
                       />
                       <BaseButton class="rounded-full p-3 ml-2"></BaseButton>
                   </div>
               </div>
           </form>
           
       </div>
        </section>
    </div>
       </template>
    </section>  
</template> -->