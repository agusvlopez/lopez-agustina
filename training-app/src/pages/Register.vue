<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { register } from '../services/auth.js';


    export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            registerLoading: false,
            newUser: {
                email: '',
                password: '',
                rol: '',
            },

        }
    },

    methods: {
        async handleSubmit() {
            this.registerLoading = true;
            try {
                await register({...this.newUser});
                this.$router.push('/');
            } catch (error) {
                //mensaje de error
            }
            
            this.registerLoading = false;
        }
    },

}
</script>

<template>
    <h1>Crear cuenta en Training App</h1>
    
    <form 
    action="#"
    @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                :disabled="registerLoading"
                type="email" 
                id="email"
                v-model="newUser.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                :disabled="registerLoading"
                type="password" 
                id="password"
                v-model="newUser.password"
            />
        </div>
        <BaseInput type="radio" id="admin" v-model="newUser.rol" value="admin" />
        <label class="me-3 p-1" for="admin">Administrador/a</label>

        <BaseInput type="radio" id="cliente" v-model="newUser.rol" value="cliente" />
        <label for="cliente" class="p-1">Cliente</label>

        <p>Opción seleccionada: {{ newUser.rol }}</p>
       <BaseButton
       :loading="registerLoading"
       >Crear cuenta</BaseButton>
    </form>
</template>