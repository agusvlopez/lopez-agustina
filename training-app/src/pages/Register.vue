<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import CardRadio from '../components/CardRadio.vue';
import StatusMessage from '../components/StatusMessage.vue';
import { register } from '../services/auth.js';


    export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput, StatusMessage, CardRadio },
    data() {
        return {
            registerLoading: false,
            registerError: false,
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
                if(this.newUser.email && this.newUser.password && this.newUser.rol){
                    this.$router.push('/');
                    this.registerError = false;
                }else {
                    this.$router.push('/registro');
                this.registerError = true;
               
                }
                
            } catch (error) {
                //mensaje de error


                
            }
            
            this.registerLoading = false;
        }
    },

}
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 class="mb-6 font-bold">Crear cuenta</h1>
    <div>
        <StatusMessage
        :class="{
                    'bg-red-100 border-red-500 text-red-700 mb-2': registerError
                }"
        :validating="registerError"
        ></StatusMessage>
    </div>

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
                placeholder="Ingresá tu correo electrónico"
            />
        </div>
        <div class="mb-8">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                :disabled="registerLoading"
                type="password" 
                id="password"
                v-model="newUser.password"
                placeholder="Ingresá tu contraseña"
            />
        </div>
        <div>
          <p class="mb-3 font-semibold">Elegí tu rol:</p>
          <div class="flex justify-center gap-3 mb-8">
            <label class="cursor-pointer" for="admin">
              <input type="radio" class="peer sr-only" id="admin" v-model="newUser.rol" value="admin" />
              <CardRadio>Administrador/a</CardRadio>
            </label>
            <label class="cursor-pointer" for="cliente">
              <input type="radio" class="peer sr-only" id="cliente" v-model="newUser.rol" value="cliente" />
              <CardRadio>Cliente</CardRadio>
            </label>
          </div>
        </div>
       <BaseButton
       :loading="registerLoading"
       class=" w-full"
       >Crear cuenta</BaseButton>
    </form>
    </div>
</div>


</template>


