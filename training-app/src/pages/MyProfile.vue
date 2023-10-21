<script>
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { subscribeToAuth } from "../services/auth";
import { getPrivateChatDoc } from '../services/private-chat';
import { getUserProfileById } from "../services/user";
import { db } from "../services/firebase";

    export default {
        name: 'MyProfile',
        data() {
            return {
                user: {
                id: null,
                email: null,
            },
            }
        },

        async mounted() {
        subscribeToAuth( async user => {
            let privateChatDoc;
            this.user = {...user};
            if(this.user.id) {
                 this.registerLoading = true;
            }

            let result = await getUserProfileById(this.user.id);
            this.user.rol = result.rol;
            console.log(result);
            const privateChatRef = collection(db, 'private-chats');
            console.log(privateChatRef);
        })
    }  
    }

</script>

<template>
    <h1>Mi perfil</h1>
</template>