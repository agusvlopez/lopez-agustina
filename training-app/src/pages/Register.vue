<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';

    export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput }
}
</script>

<template>
    <h1>Crear cuenta en Training App</h1>

    <form action="#">
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email" 
                id="email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
            />
        </div>
       <BaseButton>Crear cuenta</BaseButton>
    </form>
</template>