<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import StatusMessage from '../components/StatusMessage.vue';
import { register } from '../services/auth.js';


    export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput, StatusMessage },
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
        <!-- <div class="mb-6 container-radio">
           <input type="radio" id="admin" v-model="newUser.rol" value="admin" />
            <label class="label-radio" for="admin">Administrador/a</label> 

            <input type="radio" id="cliente" v-model="newUser.rol" value="cliente" />
            <label for="cliente" class="label-radio">Cliente</label>
        </div> -->
    <div class="flex justify-center gap-3 mb-8">

      <label class="cursor-pointer" for="admin">
        <input type="radio" class="peer sr-only" id="admin" v-model="newUser.rol" value="admin" />
        <div class="w-50 max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-600 peer-checked:ring-indigo-400 peer-checked:ring-offset-2">
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold uppercase text-gray-500 me-2">Administrador/a</p>
              <div>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </label>
      <label class="cursor-pointer" for="cliente">
        <input type="radio" class="peer sr-only" id="cliente" v-model="newUser.rol" value="cliente" />
        <div class="w-50 max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-600 peer-checked:ring-indigo-400 peer-checked:ring-offset-2">
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold uppercase text-gray-500 me-2">Cliente</p>
              <div>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>

       <BaseButton
       :loading="registerLoading"
       >Crear cuenta</BaseButton>
    </form>
    </div>
</div>
</template>


