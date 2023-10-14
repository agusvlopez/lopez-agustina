<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { login } from '../services/auth.js'


export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput },
    emits:['login'],
    data() {
        return {
            loginLoading: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        doLogin() {
            this.loginLoading = true;

            login({
                ...this.form,
            })
            .then(user => {
                this.$router.push('/');
            })
            .finally(() => {
                this.loginLoading = false;
            })

        }
    }
}

</script>

<template>
    <h1>Ingresar a mi Cuenta</h1>

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
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                :disabled="loginLoading"
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton
        :loading="loginLoading"
        >Ingresar</BaseButton>
    </form>
</template>