<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import StatusMessage from '../components/StatusMessage.vue';
import { login } from '../services/auth.js'
import { useRouter } from 'vue-router';

//para variables reactivas, utilizamos ref() que vamos a importar
const router = useRouter();
const loginLoading = ref(false);
const loginError = ref(false);
const form = ref({
    email: '',
    password: '',
    rol: ''
})

const doLogin = async () => {
    try {
        loginLoading.value = true;
        await login({
            ...form.value,
        })
        .then(user => {
            if(user.email && user.id){
                router.push('/');
                loginError.value = false;
            }else{
                router.push('/iniciar-sesion');;
                loginError.value = true;
            }
                
            console.log(user);
        })

    }catch(error) {

    }
    loginLoading.value = false;

            
            //  .then(user => {
            //      if(user.email && user.id){
            //          this.$router.push('/');
            //         this.loginError = false;
            //      }else{
            //          this.$router.push('/iniciar-sesion');
            //          this.loginError = true;
            //      }
                
            //      console.log(user);
            // })
            //  .catch(err => {
            //      console.log(err);
            //  }) 
            //  .finally(() => {
            //      this.loginLoading = false;
            //  })

// }
     
}

// export default {
//     name: 'Login',
//     components: { BaseButton, BaseLabel, BaseInput, StatusMessage },
//     emits:['login'],
//     data() {
//         return {
//             loginLoading: false,
//             loginError: false,
//             form: {
//                 email: '',
//                 password: '',
//             }
//         }
//     },
//     methods: {
//         doLogin() {
//             this.loginLoading = true;

//             login({
//                 ...this.form,
//             })
//             .then(user => {
//                 if(user.email && user.id){
//                     this.$router.push('/');
//                     this.loginError = false;
//                 }else{
//                     this.$router.push('/iniciar-sesion');
//                     this.loginError = true;
//                 }
                
//                 console.log(user);
//             })
//             .catch(err => {
//                 console.log(err);
//             }) 
//             .finally(() => {
//                 this.loginLoading = false;
//             })

//         }
//     }
// }

// 

</script>

<template> 
<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 class="font-bold mb-6">Iniciar sesión</h1>
   
    <div>
        <StatusMessage
        :class="{
                    'bg-red-100 border-red-500 text-red-700 mb-2': loginError,
                }"
        :validating="loginError"
        ></StatusMessage>
    </div>
    <form 
    action="#"
    @submit.prevent="doLogin"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                :disabled="loginLoading"
                type="email" 
                id="email"
                v-model="form.email"
                placeholder="Ingresá tu correo electrónico"
            />
        </div>
        <div class="mb-6">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                :disabled="loginLoading"
                type="password" 
                id="password"
                v-model="form.password"
                placeholder="Ingresá tu contraseña"
            />
        </div>
        
            <BaseButton
            :loading="loginLoading"
            class=" w-full"
            >Ingresar</BaseButton>
        
    </form>
    </div>
</div>
</template>