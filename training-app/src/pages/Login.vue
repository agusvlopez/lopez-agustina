<script setup>
import LoginForm from '../components/LoginForm.vue';

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
        <LoginForm />
    <!-- <div>
        <StatusMessage
        :class="{
                    'bg-red-100 border-red-500 text-red-700 mb-2': loginError,
                }"
        :validating="loginError"
        ></StatusMessage>
    </div> -->
    </div>
</div>
</template>