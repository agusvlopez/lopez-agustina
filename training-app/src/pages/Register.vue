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
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.registerLoading = true;
            try {
                await register({...this.newUser});
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
       <BaseButton
       :loading="registerLoading"
       >Crear cuenta</BaseButton>
    </form>
</template>